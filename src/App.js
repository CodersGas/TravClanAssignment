import React, {useEffect, useState} from 'react';
import './App.css';
import Layout from './components/layout';
import connectAPI from './utils/api_endpoints';
import MerchantsTable from './components/merchantsTable';
import {Grid, Box, Button, Typography} from '@material-ui/core';

function App() {

  const [merchantsData, setMerchantsData] = useState(null);
  const [err, setErr]                     = useState(false); 

  const callAPI = async() => {
    try{
      let response =  await connectAPI('getUsersList');
      setMerchantsData(response); 
    }catch(err) {
      setErr(true);
      console.log('err while fetching merchants data -> ', err);
    }
  }

  useEffect(() => {
    callAPI();
  },[]);

  return (
    <Layout title="Merchants List" >
      <div className="App">
        <Grid container justify='center' alignItems='center' >
          <Grid item md={10} xs={12} sm={12} >
            {
              !err && merchantsData &&
              <MerchantsTable 
                merchantsData={merchantsData}
              />
            }

            {
              !merchantsData && !err &&
              <Box display='flex' my={2} justifyContent='center' >
                <img 
                  src={'./doubleRingLoader.gif'}
                  width="56px"
                  height="56px"
                />
              </Box>
            }

            {
              err &&
              <Box width={1} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography>
                  Oops! Something went wrong. Please try again
                </Typography>

                <Box my={2} >
                  <Button onClick={callAPI} variant="outlined" color='primary' >
                    Retry
                  </Button>
                </Box>
              </Box>
            }
          </Grid>
        </Grid>
        {/* Add Loader */}
      </div>
    </Layout>
  );
}

export default App;
