import Link from "next/link";
import { useEffect, useState } from "react";

import BookingsTable from "@components/Bookings";
import Shell from "@components/Shell";

export default function Manage() {
  const [Eventypes, setData] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      const TypesFromApi = await fetchAll();
      setData(TypesFromApi);
    };

    getTypes();
  }, []);

  const fetchAll = async () => {
    const res = await fetch("api/bookings");
    const response = await res.json();
    console.log(response);
    return response;
  };
  return (
    <Shell>
      <div className="items-center mt-10">
        <div className="flex flex-row justify-around">
          <h1 className="text-center m-2 text-3xl font-bold">All Bookings</h1>
          {/* <Link href="/neweventtypes">
            <a className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
              Add New
            </a>
          </Link> */}
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-11">
          <BookingsTable data={Eventypes} />
        </div>
      </div>
    </Shell>
  );
}
