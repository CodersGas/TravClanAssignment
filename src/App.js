import React, {useEffect, useState} from 'react';
import './App.css';
import Layout from './components/layout';
import connectAPI from './utils/api_endpoints';
import MerchantsTable from './components/merchantsTable';
import {Grid, Box} from '@material-ui/core';

function App() {

  const [merchantsData, setMerchantsData] = useState(null);

  const callAPI = async() => {
    try{
      let response =  await connectAPI('getUsersList');
      setMerchantsData(response); 
    }catch(err) {
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
              merchantsData &&
              <MerchantsTable 
                merchantsData={merchantsData}
              />
            }

            {
              !merchantsData &&
              <Box display='flex' my={2} justifyContent='center' >
                <img 
                  src={'./doubleRingLoader.gif'}
                  width="56px"
                  height="56px"
                />
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
