import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a Context
export const DataContext = createContext();

// Create a Provider component
export const DataProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch Customers Data
    axios.get('http://localhost:3001/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customers data: ", error);
      });

    // Fetch Orders Data
    axios.get('http://localhost:3001/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders data: ", error);
      });
  }, []);

  return (
    <DataContext.Provider value={{ customers, orders }}>
      {children}
    </DataContext.Provider>
  );
};