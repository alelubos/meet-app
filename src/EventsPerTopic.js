import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const EventsPerTopic = ({ events }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(() => getData());
  }, [events]);
  const topics = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#0b50d0', '#0f90c4', '#199c1a', '#786020', '#6e3d21'];

  const getData = () => {
    const summaries = events.map((event) => event.summary);
    const data = topics.map((topic) => {
      const value = summaries.filter((summary) =>
        summary.includes(topic)
      ).length;
      return { name: topic, value };
    });
    return data.filter(({ value }) => value > 0);
  };

  return (
    <>
      <h4 className="label">Topics distribution:</h4>
      <ResponsiveContainer height={280}>
        <PieChart>
          <Legend verticalAlign="bottom" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default EventsPerTopic;
