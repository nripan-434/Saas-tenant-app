// ProjectEfficiencyGraph.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example data: duration in days
const projectDurations = [
  { project: "E-commerce", duration: 5 },
  { project: "Portfolio", duration: 12 },
  { project: "CRM", duration: 3 },
  { project: "Analytics", duration: 8 },
];

// Transform: shorter duration = higher efficiency
const data = projectDurations.map((p) => ({
  project: p.project,
  efficiency: Math.round(100 / p.duration), // inverse of duration
}));

export default function ProjectEfficiencyGraph() {
  return (
    <div className="m-5  p-10 bg-gray-100 shadow-xl  rounded-xl" style={{ width: "90%", height: 300 }}>
      <h3>Project Completion Efficiency</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="project" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
