import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface profileType {
  data: {
    username: string;
    eventType: EventTypePageProps["data"];
  };
}

const EventTypes = ({ data }: profileType) => {
  const router = useRouter();

  function redirect() {
    router.replace("/");
  }
  return (
    <>
      {data.username ? (
        <div className="bg-black">
          <div className=" bg:black m-auto max-w-3xl">
            <main className="mx-auto max-w-3xl px-4 py-24">
              <div className="mb-8 text-center">
                <h1 className="font-cal mb-1 text-3xl text-neutral-900 dark:text-white">{data.username}</h1>
                <p className="text-neutral-500 dark:text-white">A simple Web developer</p>
              </div>
              <div className="space-y-6" data-testid="event-types">
                {data.eventType.map((item, index) => (
                  <div
                    key={index}
                    style={{ display: "flex" }}
                    className="hover:border-brand group relative rounded-sm border border-neutral-200 bg-white hover:bg-gray-50 dark:border-neutral-700 dark:bg-gray-800 dark:hover:border-neutral-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="absolute right-3 top-3 h-4 w-4 text-black opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                    <Link href={`/${data.username}/${item.url}`}>
                      <a className="block w-full px-6 py-4" data-testid="event-type-link">
                        <h2 className="grow font-semibold text-neutral-900 dark:text-white">{item.title}</h2>
                        <div className="text-neutral-500 dark:text-white">
                          <h2 className="max-w-[280px] overflow-hidden text-ellipsis opacity-60 sm:max-w-[500px]">
                            {item.description}
                          </h2>
                          <ul className="mt-2 flex space-x-4 rtl:space-x-reverse ">
                            <li className="flex whitespace-nowrap">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="mt-0.5 mr-1.5 inline h-4 w-4 text-neutral-400">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"></path>
                              </svg>
                              {item.length}
                            </li>
                            <li className="flex whitespace-nowrap">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="mt-0.5 mr-1.5 inline h-4 w-4 text-neutral-400">
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"></path>
                              </svg>
                              1-on-1
                            </li>
                          </ul>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </main>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-300 to-blue-200">
          <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
              <div className="border-t border-gray-200 text-center pt-8">
                <h1 className="text-9xl font-bold text-purple-400">404</h1>
                <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
                <p className="text-2xl pb-8 px-12 font-medium">
                  Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <button
                  onClick={redirect}
                  className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                  HOME
                </button>
                <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slugid } = context.query;
  const res = await fetch(`https://simba-agjohngabriel.vercel.app/api/${slugid}`);
  const response = await res.json();
  console.log(response);
  return {
    props: {
      data: response,
    },
  };
};

export default EventTypes;
