import Link from "next/link";
import { useEffect, useState } from "react";

import Shell from "@components/Shell";
import EventTypeTable from "@components/Table";

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
    const res = await fetch("api/events/allEventTypes");
    const response = await res.json();
    return response;
  };
  return (
    <Shell>
      <div className="items-center mt-10">
        <div className="flex flex-row justify-around">
          <h1 className="text-center m-2 text-3xl font-bold">Event Types</h1>
          <Link href="/neweventtypes">
            <a className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
              Add New
            </a>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-11">
          <EventTypeTable data={Eventypes} />
        </div>
      </div>
    </Shell>
  );
}
