import {PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import { useContext } from 'react';
import {DataContext} from '../store/DataContext'
import Box from '@mui/material/Box';


function MyResponsivePie({initialData}){

    const { filteredData } = useContext(DataContext);
    const actualData = (filteredData.length === 0 ? initialData : filteredData);
    
    const pie = actualData.map(d => d['Electric Vehicle Type']);
    const countMap = {};

    pie.forEach(vehicle => {
        if (!countMap[vehicle]) {
          countMap[vehicle] = { name: vehicle, count: 1 };
        } else {
          countMap[vehicle].count += 1;
        }
      });

    const pieData = Object.values(countMap)

      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

    
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
            <p>Plug-in Hybrid Electric Vehicle (PHEV) V/S Battery Electric Vehicle (BEV)</p>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="count"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
      </Box>
    );
}

export default MyResponsivePie;