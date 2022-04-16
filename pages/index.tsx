import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/bookings");
  }, [loading, session]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-center m-2 text-3xl font-bold">Welcome to Scheduler</h1>
      <h2>Proceed to seamless Scheduling</h2>
      <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-row m-11 justify-center lg:w-1/3">
        <Link href="/auth/login">
          <a className="p-1 text-white rounded bg-blue-800">LOGIN</a>
        </Link>
        <Link href="/auth/signup">
          <a className="p-1 ml-2 text-white rounded bg-blue-800">SIGN UP</a>
        </Link>
      </div>
    </div>
  );
}
