import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#FA2C37", "#875CF5", "#FF6900", "#4F39F6", "#00C49F"];

const RecentExpenseWithChart = ({ data, totalExpense }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.category,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Expense Distribution</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Expense"
        totalAmount={`PKR${totalExpense}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentExpenseWithChart;
