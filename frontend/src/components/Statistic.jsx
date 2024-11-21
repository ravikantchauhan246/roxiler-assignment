import React, { useEffect, useState } from "react";
import { getStatistics } from "../api/api";

const Statistic = ({ month, initialData }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistic = async () => {
      const { data } = await getStatistics({ month });
      setStatistics(data);
      // console.log(data);
    };
    fetchStatistic();
  }, [month]);
  return (
    <div className="mb-10 w-50">
      <h3 className="text-[20px]">
        Statistics-<strong>{month}</strong>
      </h3>
      <div className="h-auto w-60 bg-orange-300 rounded-xl p-3 border-none leading-8">
        <p>Total Transactions: {statistics?.totalTransactionAmount}</p>
        <p>Total Items Sold: {statistics?.totalItemsSold}</p>
        <p>Total Items Not Sold: {statistics?.totalItemsNotSold}</p>
      </div>
    </div>
  );
};

export default Statistic;
