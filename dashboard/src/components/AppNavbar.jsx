import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DataContext } from '../store/DataContext'; 


export default function AppNavbar(data) {
    const newArr = Object.values(data);

    const { setFilteredData } = React.useContext(DataContext);

    const [formData, setFormData] = React.useState({
        selected: {
          year: "All",
          company: "All",
          city: "All",
          county: "All",
        },
        options: {
          years: ['All', ...new Set(newArr[0].map(d => d['Model Year']))],
          companies: ['All', ...new Set(newArr[0].map(d => d.Make))],
          cities: ['All', ...new Set(newArr[0].map(d => d.City))],
          counties: ['All', ...new Set(newArr[0].map(d => d.County))],
        },
      });

      React.useEffect(() => {
        const getFilteredData = () => {
          return newArr[0].filter(item =>
            (formData.selected.year === "All" || item['Model Year'] === formData.selected.year) &&
            (formData.selected.company === "All" || item.Make === formData.selected.company) &&
            (formData.selected.city === "All" || item.City === formData.selected.city) &&
            (formData.selected.county === "All" || item.County === formData.selected.county)
          );
        };
      
          const updatedFilteredData = getFilteredData();
          setFilteredData(updatedFilteredData);
        
      }, [formData.selected]);

      const handleChange = (field) => (event) => {
        const value = event.target.value;
      
        setFormData(prevFormData => ({
          ...prevFormData,
          selected: {
            ...prevFormData.selected,
            [field]: value,
          },
        }));
      };

      // const getFilteredData = () => {
      //   return newArr[0].filter(item =>
      //     (formData.selected.year === "All" || item['Model Year'] === formData.selected.year) &&
      //     (formData.selected.company === "All" || item.Make === formData.selected.company) &&
      //     (formData.selected.city === "All" || item.City === formData.selected.city) &&
      //     (formData.selected.county === "All" || item.County === formData.selected.county)
      //   );
      // };

    

      // const handleChange = (field) => (event) => {
      //   const value = event.target.value;

      //   setFormData(prevFormData => ({
      //     ...prevFormData,
      //     selected: {
      //       ...prevFormData.selected,
      //       [field]: value,
      //     },
      //   }));

      //   const updatedFilteredData = getFilteredData();
      //   setFilteredData(updatedFilteredData);
      // };



  return (

    <Box>
      <AppBar sx={{display: "flex", justifyContent:"space-between", flexDirection:"row"}} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Dashboard
          </Typography>
        </Toolbar>
        <form>
        <FormControl variant="filled" sx={{ m:1, width: 200 }}>
        <InputLabel id="year">Model Year</InputLabel>
        <Select
          labelId="multiple-name-label"
          id="year"
          name='year'
          value={formData.selected.year}
          onChange={handleChange('year')}
          MenuProps={{
            style: {
               maxHeight: 400,
                  },
            }}
        >
          {formData.options.years.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m:1, width: 200 }}>
        <InputLabel id="company">Company</InputLabel>
        <Select
          labelId="company-name-label"
          id="company"
          value={formData.selected.company}
          onChange={handleChange('company')}
          MenuProps={{
            style: {
               maxHeight: 400,
                  },
            }}
        >
          {formData.options.companies.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m:1, width: 200 }}>
        <InputLabel id="city">City</InputLabel>
        <Select
          labelId="city-name-label"
          id="city"
          value={formData.selected.city}
          onChange={handleChange('city')}
          MenuProps={{
            style: {
               maxHeight: 400,
                  },
            }}
        >
          {formData.options.cities.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m:1, width: 200 }}>
        <InputLabel id="county">County</InputLabel>
        <Select
          labelId="county-name-label"
          id="county"
          value={formData.selected.county}
          onChange={handleChange('county')}
          MenuProps={{
            style: {
               maxHeight: 400,
                  },
            }}
        >
          {formData.options.counties.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </form>
      </AppBar>
    </Box>

  );
}