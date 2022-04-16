import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Scheduler</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/bookings">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">Events</a>
            </Link>
            <Link href="/eventtypes">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Event-Types
              </a>
            </Link>

            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              Profile
            </a>
          </div>
          <div className="inline-flex">
            <h2 className="mr-5 text-white">{session?.user?.name}</h2>
            <button
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }>
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Sign Out
              </a>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
