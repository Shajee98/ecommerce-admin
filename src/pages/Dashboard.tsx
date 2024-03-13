import React from 'react'
import Layout from '../components/Layout'
import OrdersGraph from '../components/kpis/Orders'
import RevenueLineGraph from '../components/kpis/RevenueLineGraph'
import RevenuePieChart from '../components/kpis/RevenuePieChart'

const Dashboard = () => {
  return (
    <Layout>
        <div className='flex flex-col gap-5 h-[90%] w-full'>
            <div className='flex flex-col gap-3 h-[50%]'>
                <h1>Orders</h1>
                <OrdersGraph />
            </div>
            <div className='flex flex-col gap-3 h-[50%]'>
                <h1>Revenue</h1>
                <div className='flex gap-5 justify-center items-center w-full h-full'>
                <RevenueLineGraph />
                <RevenuePieChart />
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard