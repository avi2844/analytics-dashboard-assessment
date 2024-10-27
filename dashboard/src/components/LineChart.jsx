import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useContext } from 'react';
import {DataContext} from '../store/DataContext'
import Box from '@mui/material/Box';

function MyResponsiveLine({initialData}){

    const { filteredData } = useContext(DataContext);
    const actualData = (filteredData.length === 0 ? initialData : filteredData);
    
    const pie = actualData.map(d => ({name:d.Model, value:d['Electric Range']}));

    const totals = {}
    pie.forEach(({ name, 'value': range }) => {
        const rangeValue = Number(range) || 0;
        if (!totals[name]) {
          totals[name] = { total: 0, count: 0 };
        }
      
        totals[name].total += rangeValue;
        totals[name].count += 1;
      });

      const averageData = Object.keys(totals).map(name => ({
        name,
        value: totals[name].count > 0 ? parseFloat((totals[name].total / totals[name].count).toFixed(2)) : 0,
      }));

      averageData.sort((a,b) => b.value - a.value);

    
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
            <p>Top Models with Electric Range</p>
          <LineChart
            data={averageData.slice(0, 10)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
}

export default MyResponsiveLine;

  
                              
  