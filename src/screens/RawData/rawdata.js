import React, { useContext } from 'react';
import { DataContext } from '../../components/DataContext/DataContext';

const RawData = () => {
    const { customers, orders } = useContext(DataContext);

    return (
        <div>
            <h1>Raw Data</h1>
            <h2>Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.customer_id}>{customer.customer_id} - {customer.name} - {customer.email}</li>
                ))}
            </ul>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.order_id}>
                        Order Date: {order.order_date}, Amount: {order.order_amount}, Customer ID: {order.customer_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RawData;
