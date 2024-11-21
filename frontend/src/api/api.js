import axios from "axios";

const URL = 'http://localhost:5000';

export const initDatabase = () => axios.get(`${URL}/initialize`);

export const getTransactions = (params) => axios.get(`${URL}/transactions`, { params });

export const getStatistics = (params) => axios.get(`${URL}/statistics`, { params });

export const getBarChartData = (params) => axios.get(`${URL}/barchart`, { params });

export const getPieChartData = (params) => axios.get(`${URL}/piechart`, { params });

export const getCombinedData = (params) => axios.get(`${URL}/combined`, { params });


