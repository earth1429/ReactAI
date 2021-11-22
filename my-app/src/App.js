import "./App.css";
import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material/";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { green, orange, purple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Axios from 'axios';
import { render } from "react-dom";

class Welcome extends React.Component {
  render() {
    return <h1>Hello1, {this.props.name}</h1>;
  }
}

function App() { 
  function Welcome(props) {
    return <h1>Hello2, {result.toStr}</h1>;
  }
  //Test API
/*  const [upload, setUpload] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/upload")
      .then((res) => res.json())
      .then((data) => {
        setUpload(upload);
        console.log(upload);
      });
  }, []);

  const [predict, setPredict] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/predict")
      .then((res) => res.json())
      .then((data) => {
        setPredict(predict);
        console.log(upload);
      });
  });*/

  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [image, setImage] = React.useState("/Image.png");
  const [result, setResult] = React.useState('');
  const Input = styled("input")({
    display: "none",
  });
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  }));

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  const onImageChange = async (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
     // let fileExt = img['name'].split('.').pop();
     // const myRenamedFile = new File([img], create_UUID()+ "."+fileExt);
      let data = new FormData();
      data.append('image', img)

      console.log(data);
      setImage(URL.createObjectURL(img));
      await Axios.post('http://localhost:5000/upload', data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  };

  const getResult = async (event) => {
    await Axios.get('http://localhost:5000/predict')
    .then(function (response){
      setResult(response.data)
      console.log(response.data)
    }
    );
  }
  function RenderResult() {
    return (
      <div>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
            }}
          >
            Confident Level: {result.ConfidentLevel}
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
            }}
          >
            Type: {result.Status}
          </Box>
        </div>
    )
  }
  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h4" color="inherit" component="div">
              AI Classification Image
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="App-header">
        <img src={image} height="350px" width="450px" />
        <div style={{ height: "20px" }} />
        <Stack direction="row" alignItems="center" spacing={3}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={onImageChange}
            />
            <ColorButton variant="contained" component="span" size="large">
              Upload Image
            </ColorButton>
          </label>
          <label>
            <ColorButton2 variant="contained" size="large" onClick={getResult}>
              Classify Image
            </ColorButton2>
          </label>
        </Stack>
        <div>{(result=='') ? '': <RenderResult Status={result.Status} ConfidentLevel={result.ConfidentLevel}/>}</div>
      </div>
    </div>
  );
}

export default App;
