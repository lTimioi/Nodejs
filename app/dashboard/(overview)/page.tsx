import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import CardWrapper from '@/app/ui/dashboard/cards';
// 导入获取的数据 11
// import { fetchCardData } from '@/app/lib/data';

// import { fetchRevenue,fetchLatestInvoices,fetchCardData } from '@/app/lib/data';
import {Suspense} from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton,CardsSkeleton } from '@/app/ui/skeletons';
export default async function Page() {
  // 从数据库中获取收入数据   revenue 获取data.ts中传入的数据
  // const revenue = await fetchRevenue();
  // 从数据库中获取最新发票数据   latestInvoices 获取data.ts中传入的数据
  // const cardData = await fetchCardData();  11
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices, 
  // } = await fetchCardData();   11
  
  return (
    <main> 
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 渲染卡片组件 */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
       {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> 
         <Card title="Pending" value={totalPendingInvoices} type="pending" /> 
         <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />   11 */} 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* 渲染收入图表 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* 渲染最新发票组件 */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}