import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface PropType {
  data: {
    title: string;
    description: string;
    length: number;
    id: string;
    userId: string;
  };
}

const Index = ({ data }: PropType) => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typeId = data ? data.id : "";
  const mainId = data ? data.userId : "";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    return axios
      .post("/api/book", {
        date,
        time,
        name,
        email,
        note,
        typeId,
        mainId,
      })
      .then(() => {
        alert("success");
        router.replace({
          pathname: "/success",
          query: {
            title: data.title,
            description: data.description,
            length: data.length,
            name: name,
            time: time,
            date: date,
          },
        });
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  function redirect() {
    router.replace("/");
  }

  return (
    <>
      {data ? (
        <div className="bg-white shadow-md rounded items-center px-8 pt-6 pb-8 mb-4 flex flex-row lg:m-11 lg:w-2/2 sm:m-0">
          <div className="hidden pr-8 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-full">
            <ul className=""></ul>
            <h2 className="mt-3 font-medium">Gabriel John</h2>
            <h1 className="font-cal mb-4 text-xl font-semibold">{data.title}</h1>
            <p className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"></path>
              </svg>
              {data.description}
            </p>
            <p className="mb-1 -ml-2 px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="mr-[10px] -mt-1 ml-[2px] inline-block h-4 w-4 text-gray-400">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"></path>
              </svg>
              {`${data.length} Minutes`}
            </p>
            <div data-state="closed">
              <button
                type="button"
                aria-controls="radix-0"
                aria-expanded="false"
                data-state="closed"
                className="min-w-32 mb-1 -ml-2 px-2 py-1 text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clipRule="evenodd"></path>
                </svg>
                America/New_York
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-1 -mt-1 inline-block h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              <div data-state="closed" id="radix-0" hidden></div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col lg:m-11 lg:w-1/2 sm:m-0">
            <div className="mb-6">
              <h1 className="font-semibold mb-7">Reserve a ticket for Event</h1>
              <p className="text-xs">You are one step away</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                <div className="flex -mr-px">
                  <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                    Schedule Date
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="date"
                  placeholder="name"
                  required
                  value={date}
                  onInput={(e) => setDate(e.currentTarget.value)}
                  className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative"
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                <div className="flex -mr-px">
                  <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                    Schedule Time
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="time"
                  placeholder="name"
                  required
                  value={time}
                  onInput={(e) => setTime(e.currentTarget.value)}
                  className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative"
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                <div className="flex -mr-px">
                  <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                    Your Name
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  required
                  value={name}
                  onInput={(e) => setName(e.currentTarget.value)}
                  className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative"
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                <div className="flex -mr-px">
                  <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                    Your Email
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  required
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative"
                />
              </div>

              <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2">Additional Note</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  required
                  value={note}
                  onInput={(e) => setNote(e.currentTarget.value)}
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-black
                 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                  type="submit">
                  {isSubmitting ? "Loading.... " : "Submit"}
                </button>
              </div>
            </form>
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
  const { slugid, url } = context.query;
  const res = await fetch(`http://localhost:3000/api/${slugid}/${url}`);
  const response = await res.json();
  return {
    props: {
      data: response,
    },
  };
};

export default Index;
