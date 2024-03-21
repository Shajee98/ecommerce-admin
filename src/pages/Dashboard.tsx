import React from "react";
import Layout from "../components/Layout";
import OrdersGraph from "../components/kpis/OrdersBarGraph";
import RevenueLineGraph from "../components/kpis/RevenueLineGraph";
import RevenuePieChart from "../components/kpis/RevenuePieChart";
import CategoryBarGraph from "../components/kpis/CategoryBarGraph";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-5 h-[90%] w-full">
        <div className="flex gap-3 h-[50%] w-full">
          <div className="flex gap-3 w-[50%] flex-col">
            <h1>Orders</h1>
            <OrdersGraph />
          </div>
          <div className="flex gap-3 w-[50%] flex-col">
            <h1>Categories</h1>
            <RevenuePieChart />
          </div>
        </div>
        <div className="flex gap-3 h-[50%] w-full">
          <div className="flex gap-3 w-[50%] flex-col">
            <h1>Revenue</h1>
            <RevenueLineGraph />
          </div>
          <div className="flex gap-3 w-[50%] flex-col">
            <h1>Category</h1>
            <CategoryBarGraph />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
