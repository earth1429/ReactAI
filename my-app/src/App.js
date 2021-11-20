import './App.css';
import * as React from 'react';
import {AppBar,Toolbar,Typography} from '@mui/material/';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { green, orange, purple} from '@mui/material/colors';
import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';

function App() {

  //Test API
  const[data, setData] = useState([{}])  
  useEffect(() => {
    fetch("/upload").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  const [image,setImage] = React.useState('/Image.png')
  const Input = styled('input')({
    display: 'none',
  });
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));


  const onImageChange = event => {
    console.log(event.target.files)
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img))
    }
  };
  
  return (
    <div className='App'>
    <div style={{ width: '100%' }}>
     <AppBar position="static">
  <Toolbar variant="dense">
    <Typography variant="h4" color="inherit" component="div">
      AI Classification Image 
    </Typography>
  </Toolbar>
</AppBar>
    </div>
    <div className='App-header'>
      <img src ={image} height='350px' width='450px'/>
      <div style={{ height: '20px' }}/>
     <Stack direction="row" alignItems="center" spacing={3}>
     <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onImageChange}/>
        <ColorButton variant="contained" component="span" size="large">
          Upload Image
        </ColorButton>
      </label>
      <label>
      <ColorButton2 variant="contained" size="large">Classify Image</ColorButton2>
        </label>
      </Stack>
      <div>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
        }}
      >
        Confident Level:
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
        }}
      >
        Type:
      </Box>
      </div>
    </div>
    </div>
  );
}

export default App;