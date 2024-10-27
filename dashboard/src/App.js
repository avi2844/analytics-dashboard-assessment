import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Data from './data/Electric_Vehicle_Population_Data.csv';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import MyResponsiveBar from './components/BarChart';
import Box from '@mui/material/Box';
import { DataProvider } from './store/DataContext';
import MyResponsivePie from './components/PieChart';
import MyResponsiveLine from './components/LineChart';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid2 } from '@mui/material';


function App() {
  const [data, setData] = useState([]);

    useEffect(() => {
        fetch(Data)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((text) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data);
                    },
                    error: (error) => {
                        console.error("Error parsing the file:", error);
                    }
                });
            })
    }, []);


  return (
    <div className="App">
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Box>
          <DataProvider>
            <AppNavbar data={data} />
            <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",  // Two columns in the top row
          gridTemplateRows: "50% 50%",   // Two rows, with the second row taking full width
          columnGap: 2,                    // Gap between columns only
          rowGap: 6, 
          width: "100%",
          height: "100vh",                 // Full viewport height
          overflow: "inherit",
        }}
      >
        {/* Top row: bar chart and pie chart side by side */}
        <MyResponsiveBar initialData={data} />
        <MyResponsivePie initialData={data} />

        {/* Bottom row: line chart spanning both columns */}
        <Box sx={{ gridColumn: "1 / span 2", width: "100%", height: "100%" }}>
          <MyResponsiveLine initialData={data} />
        </Box>
      </Box>
          </DataProvider>
        </Box>
      )}
    </div>
  );
}

export default App;
