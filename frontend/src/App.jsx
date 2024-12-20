import { useEffect, useState } from "react";

import Table from "./components/Table";
import { getCombinedData, initDatabase } from "./api/api";
import Statistic from "./components/Statistic";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import NotePopUp from "./components/NotePopUp";

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
  },[month]);

  // console.log(initialData);

  return (
    <>
      <NotePopUp />
      <div className="h-full w-full flex flex-col items-center mt-12 gap-6">
        {/* Dashboard Header */}
        <div className="h-[290px] w-[290px] bg-gradient-to-br from-orange-200 to-orange-500 flex justify-center items-center rounded-full shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
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
          className="w-[240px] h-10 border border-orange-300 rounded-md px-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
        <Statistic month={month}/>
        <PieChart month={month} initData={initialData} />
      </div>
        <BarChart month={month} />
      </div>
    </>
  );
}

export default App;
