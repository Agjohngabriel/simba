interface BookingDataType {
  data: {
    date: string;
    time: string;
    note: string;
    user: {
      name: string;
    };
    attendees: {
      name: string;
      email: string;
    }[];
    eventType: {
      title: string;
      length: string;
    };
  }[];
}

const BookingsTable = ({ data }: BookingDataType) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    What
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Between
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    when
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.eventType.title}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.user.name} and{" "}
                      {item.attendees.map((it, index) => (
                        <>
                          <span>{it.name} </span>
                          <span>({it.email})</span>
                        </>
                      ))}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      On {item.date} -{item.time}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
