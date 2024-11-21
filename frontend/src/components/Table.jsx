import React, { useEffect, useState } from "react";
import { getTransactions } from "../api/api";
import { Tooltip } from 'react-tooltip';

const Table = ({ month, initialData }) => {
  const [transactions, setTransactions] = useState(initialData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchData = async () => {
    const response = await getTransactions({ month, search, page, perPage });
    const data = await response.data;
    setTransactions(data.transactions);
    setPage(Number(data.page));
  };

  useEffect(() => {
    fetchData();
  }, [month, search, page]);

  //console.log(transactions)

  return (
    <div className="h-full w- full flex justify-center flex-col items-center gap-1">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or description"
        className="w-1/2 h-10 border-2 border-gray-300 rounded-md pl-2 mt-2"
      />
      {transactions.length === 0 ? (
        <div className="mt-4 text-gray-600">No more transactions</div>
      ) : (
        <table className="text-sm text-center text-gray-800 table-fixed h-[70%] w-[90%] mt-4">
          <thead className="border-2 p-2 border-solid border-gray-500 text-md text-gray-800 uppercase">
            <tr>
              <th className="px-6 py-2 border-r-2 border-gray-400">Title</th>
              <th className="px-6 py-2 border-r-2 border-gray-400">
                Description
              </th>
              <th className="px-6 py-2 border-r-2 border-gray-400">Price</th>
              <th className="px-6 py-2 border-r-2 border-gray-400">
                Date of Sale
              </th>
              <th className="px-6 py-2 border-r-2 border-gray-400">Category</th>
              <th className="px-6 py-2 border-r-2 border-gray-400">Image</th>
              <th className="px-6 py-2 border-r-2 border-gray-400">Sold</th>
            </tr>
          </thead>
          <tbody className="border-2 p-2 border-solid border-gray-500 text-md text-gray-700 uppercase">
            {transactions.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-gray-300">
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  {transaction?.title}
                </td>
                <td
                  className="px-6 py-2 border-r-2 border-gray-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
                  data-tooltip-id="description-tooltip"
                  data-tooltip-content={transaction?.description}
                >
                  {transaction?.description}
                </td>
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  {transaction?.price}
                </td>
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  {new Date(transaction?.dateOfSale).toLocaleDateString()}
                </td>
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  {transaction?.category}
                </td>
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  <img 
                    src={transaction?.image} 
                    alt={transaction?.title}
                    className="w-16 h-16 object-cover mx-auto rounded-md"
                  />
                </td>
                <td className="px-6 py-2 border-r-2 border-gray-400">
                  {transaction?.sold ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Tooltip id="description-tooltip" place="top" effect="solid" style={{ maxWidth: '200px' }} />
      <div className='flex gap-4'>
        
                <button onClick={() => setPage(prev => Number(prev) - 1)} disabled={page === 1} className='border-solid border-1 bg-yellow-800 text-white p-2 w-[100px] rounded-md disabled:bg-slate-400'>Previous</button>
                <div className='border-solid border-1 bg-yellow-400 p-2 w-10 text-center rounded-md font-semibold'>{page}</div>
                <button onClick={() => setPage(prev => Number(prev) + 1)} disabled={page===6} className='border-solid border-1 bg-yellow-800 text-white p-2 w-[100px] rounded-md disabled:bg-slate-400'>Next</button>
            </div>
    </div>
  );
};

export default Table;
