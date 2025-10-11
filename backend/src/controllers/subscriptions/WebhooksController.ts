import { Request, Response } from "express";
import { stripe } from "../../utils/stripe";
import Stripe from "stripe";
import { saveSubscription } from "../../utils/manageSubscription";

class WebhookController {
  async handle(req: Request, res: Response) {
    let event: Stripe.Event = req.body;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"] as string;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        );
      } catch (err) {
        if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
          console.log("Webhook signature failed", err.message);
        } else {
          console.log("Webhook signature failed");
        }
        return res.sendStatus(400);
      }
    }

    switch (event.type) {
      case "customer.subscription.deleted": {
        const payment = event.data.object;
        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true,
        );
        break;
      }
      case "customer.subscription.updated": {
        const paymentIntent = event.data.object;
        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false,
        );
        break;
      }
      case "checkout.session.completed": {
        const checkoutSession = event.data.object;
        await saveSubscription(
          checkoutSession.subscription!.toString(),
          checkoutSession.customer!.toString(),
          true,
        );
        break;
      }
      default:
        console.log("evento desconhecido " + event.type);
    }

    res.send();
  }
}

export { WebhookController };
