import React from 'react';
import { TrendingUp,TrendingDown, Users, Target ,Banknote,Calendar, Download} from 'lucide-react';
import { Button } from '../../components';
import Table from './Table';

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.00",
      change: 12.5,
      icon: Banknote,
      color: "text-violet-800",
      bgColor: "bg-violet-100",
    },
    {
      title: "Active Users",
      value: "12,842",
      change: 8.2,
      icon: Users,
      color: "text-gray-800",
      bgColor: "bg-gray-100",
    },
    {
      title: "Conversion Rate",
      value: "3.4%",
      change: -1.4,
      icon: Target,
      color: "text-rose-600",
      bgColor: "bg-rose-100",
    },
  ];

  return (
    <div className="p-6">
      <div className="md:flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          <p className="text-gray-500 mt-1">
            Deep dive into this month's curated performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 md:mt-3">
            <Button variant='white' icon={<Calendar className='h-4 w-4'/> } className="text-sm">Last 30 Days</Button>

            <Button variant='primary' icon={<Download className='h-4 w-4'/> } className="text-sm">Export</Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change > 0;

          return (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs p-1 font-medium rounded-md ${isPositive ? 'text-emerald-600 bg-emerald-100': 'text-rose-600 bg-rose-100'}`}>
                  <span>{isPositive ? <TrendingUp className='h-3 w-3' />: <TrendingDown className='h-3 w-3' />}</span>
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-gray-500 text-sm font-medium">{metric.title}</p>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Table/>
    </div>
  );
};

export default Dashboard;