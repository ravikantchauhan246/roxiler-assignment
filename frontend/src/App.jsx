import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Table from "./components/Table";
import { getCombinedData, initDatabase } from "./api/api";
import Statistic from "./components/Statistic";

function App() {
  const [month, setMonth] = useState("January");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    initDatabase();
    const combineData = async () => {
      const { data } = await getCombinedData({ month });
      setInitialData(data.transactions);
    };
    combineData();
  }, []);

  console.log(initialData);

  return (
    <>
      <div className="h-full w-full flex flex-col items-center mt-12 gap-6">
        {/* Dashboard Header */}
        <div className="h-[290px] w-[290px] bg-gradient-to-br from-yellow-200 to-yellow-500 flex justify-center items-center rounded-full shadow-lg">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Transaction
            <br /> Dashboard
          </h1>
        </div>

        {/* Month Selector */}
        <select
          value={month}
          onChange={(e) => {
            e.preventDefault();
            setMonth(e.target.value);
          }}
          className="w-[240px] h-10 border border-gray-300 rounded-md px-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value={"select"} disabled>
            Select Month
          </option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Table Section */}
        <Table month={month} initialData={initialData} />
        <div className='p-2 flex w-full justify-around items-center'>
        <Statistic month={month} initData={initialData} />
        
      </div>
        
      </div>
    </>
  );
}

export default App;
