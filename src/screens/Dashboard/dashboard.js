
import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../components/DataContext/DataContext';
import Histogram from '../../components/Histogram';

const Dashboard = () => {
    const { orders } = useContext(DataContext);

    const processOrderDataForHistogram = () => {
        // Create bins for histogram
        const bins = [
            { range: '0-10', count: 0 },
            { range: '10-20', count: 0 },
            { range: '20-30', count: 0 },
            { range: '30-40', count: 0 },
            { range: '40-50', count: 0 },
            { range: '50-60', count: 0 },
            { range: '60-70', count: 0 },
            { range: '70-80', count: 0 },
            { range: '80-90', count: 0 },
            { range: '90-100', count: 0 },
        ];

        // Categorize orders into bins
        orders.forEach(order => {
            const amount = order.order_amount;
            for (let bin of bins) {
                const [min, max] = bin.range.split('-').map(Number);
                if (amount >= min && amount < max) {
                    bin.count += 1;
                    break;
                }
            }
        });

        return bins;
    };

    const histogramData = useMemo(processOrderDataForHistogram, [orders]);

    return (
        <div>
            <h1>Dashboard - Order Price Data Histogram</h1>
            <Histogram data={histogramData} />
        </div>
    );
};

export default Dashboard;
