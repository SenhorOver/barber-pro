import { AuthTokenError } from "@/services/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function canSSRAuth<P extends Record<string, any>>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["@barber.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, "@barber.token", { path: "/" });

        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      destroyCookie(ctx, "@barber.token", { path: "/" });
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  };
}
