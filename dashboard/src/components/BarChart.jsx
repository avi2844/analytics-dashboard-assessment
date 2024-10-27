import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts';
import { useContext } from 'react';
import {DataContext} from '../store/DataContext'
import Box from '@mui/material/Box';


function MyResponsiveBar({initialData}){

    const { filteredData } = useContext(DataContext);
    const actualData = (filteredData.length === 0 ? initialData : filteredData);
    

    const bar = actualData.map(d => d.Make);
    const countMap = {};

    bar.forEach(company => {
        if (!countMap[company]) {
          countMap[company] = { name: company, count: 1 };
        } else {
          countMap[company].count += 1;
        }
      });

    const barData = Object.values(countMap)
    
    barData.sort((a,b) => b.count - a.count);

    
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <p>Top EV Companies</p>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData.slice(0, 10)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
      </Box>
    );
}

export default MyResponsiveBar;