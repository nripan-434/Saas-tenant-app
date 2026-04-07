import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function ProjectEfficiencyGraph({ projects = [] }) {

  const data = projects.map((p) => ({
    project: p.name,
    progress: p.progress || 0,
    status: p.prjstatus
  }));

  const getColor = (p) => {
    if (p.status === "completed") return "#22c55e"; // green
    if (p.progress < 30) return "#ef4444"; // red
    if (p.progress < 70) return "#facc15"; // yellow
    return "#B6FF3B"; // your theme
  };

  return (
    <div className="p-6 bg-[#0C1A2B] text-[#B6FF3B] rounded-xl h-full">
      <h3 className="mb-4 font-semibold">Project Progress</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#363d47" />
          <XAxis
  dataKey="project"
  stroke="#B6FF3B"
  tickFormatter={(value) =>
    value.length > 10 ? value.slice(0, 10) + "..." : value
  }
/>
          <YAxis stroke="#B6FF3B" domain={[0, 100]} />
          <Tooltip />

          <Bar dataKey="progress">
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}