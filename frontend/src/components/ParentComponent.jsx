
import React, { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios';

const ParentComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setData(response.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Table</h1>
      <Table data={data} />
    </div>
  );
};

export default ParentComponent;