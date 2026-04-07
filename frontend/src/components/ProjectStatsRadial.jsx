import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";


export const ProjectStatsRadial = ({ projects = [] }) => {
  const total = projects.length;

  const completed = projects.filter(p => p.prjstatus === "completed").length;
  const onhold = projects.filter(p => p.prjstatus === "on-hold").length;
  const active = total - completed - onhold;

  const data = [
    { name: "Completed", value: completed, fill: "#22c55e" },
    { name: "Active", value: active, fill: "#3b82f6" },
    { name: "On-hold", value: onhold, fill: "#ef4444" }
  ];

  return (
    <div className="w-full relative outline-none focus:outline-none focus:ring-0 lg:h-94 h-70 flex lg:flex-col bg-[#0C1A2B] rounded-xl p-4">
      <h2 className="text-[#B6FF3B]  outline-none focus:outline-none focus:ring-0 font-semibold mb-2">Project Overview</h2>

      <ResponsiveContainer className='outline-0'>
        <RadialBarChart
          cx="50%"
          cy="40%"
          innerRadius="30%"
          outerRadius="70%"
          data={data}
          className='outline-0'
        >
          <RadialBar dataKey="value" className='outline-none focus:outline-none focus:ring-0' cornerRadius={90} />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="flex absolute bottom-0 right-0 gap-1 bg-[#0C1A2B] p-4 rounded-md outline-0 justify-center items-center mt-2 text-xs">
        <span className="text-green-400">Completed {completed}</span>
        <span className="text-blue-400">Active {active}</span>
        <span className="text-red-600">On-Hold {onhold}</span>
      </div>
    </div>
  );
};