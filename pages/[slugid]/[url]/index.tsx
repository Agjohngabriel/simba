import { GetServerSideProps } from "next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PropType {
  data: {
    title: string;
    description: string;
    length: number;
  };
}

const Index = ({ title, description, length }: PropType["data"]) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="bg-white shadow-md rounded items-center px-8 pt-6 pb-8 mb-4 flex flex-row m-11 lg:w-2/2">
      <div className="hidden pr-8 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-1/2">
        <ul className=""></ul>
        <h2 className="mt-3 font-medium">Gabriel John</h2>
        <h1 className="font-cal mb-4 text-xl font-semibold">{title}</h1>
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
          {description}
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
          {`${length} Minutes`}
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

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-11 lg:w-1/2">
        <div className="mb-6">
          <h1 className="font-semibold mb-7">Start your 14 days free trial</h1>
          <p className="text-xs">
            No credit card required. Try all pro features for 14 days. Upgrade at any time to Pro for
            $12/month.
          </p>
        </div>
        <form>
          <div className="flex items-center justify-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                console.log(date);
              }}
              // minDate={5}
              placeholderText="Select a date after 5 days ago"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              required
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-black
                 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slugid, url } = context.query;
  const res = await fetch(`http://localhost:3000/api/${slugid}/${url}`);
  const response = await res.json();
  return {
    props: {
      title: response.title,
      description: response.description,
      length: response.length,
    },
  };
};

export default Index;
