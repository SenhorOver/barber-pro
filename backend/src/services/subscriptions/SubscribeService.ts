import prismaClient from "../../prisma";
import { stripe } from "../../utils/stripe";

interface SubscribeRequest {
  user_id: string;
}

class SubscribeService {
  async execute({ user_id }: SubscribeRequest) {
    // Buscar o usuário e cadastrar ele no stripe
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!findUser) {
      throw new Error("User not Found");
    }

    let customerId = findUser.stripe_customer_id;

    if (!customerId) {
      // Criar conta no stripe
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email,
      });
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      });

      customerId = stripeCustomer.id;
    }

    // Inicializar o checkout de pagamento
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: process.env.STRIPE_PRICE as string, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return {
      sessionId: stripeCheckoutSession.id,
      url: stripeCheckoutSession.url,
    };
  }
}

export { SubscribeService };
