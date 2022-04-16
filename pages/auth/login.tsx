import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { getSession } from "@helpers/auth";

interface ServerSideProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/bookings";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      return;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-center m-2 text-3xl font-bold">Welcome to Scheduler</h1>
        <h2>Sign in to your account</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-11 lg:w-1/3">
          <form onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                required
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>
            <div className="mb-6">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                required
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              style={{ cursor: "pointer" }}>
              {isSubmitting ? "Loading...  " : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/bookings",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
