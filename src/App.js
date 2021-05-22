import React, {useEffect, useState} from 'react';
import './App.css';
import Layout from './components/layout';
import connectAPI from './utils/api_endpoints';
import MerchantsTable from './components/merchantsTable';
import {Box, Button, Typography} from '@material-ui/core';
import AllSelectedMerchants from './allSelectedMerchants';
import LoaderErrorComponent from './components/loaderErrorComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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

  return(
    <Router>
      <Switch>

        <Route path="/allSelectedMerchants">
          <Layout>
            {
              merchantsData &&
              <AllSelectedMerchants merchantsData={merchantsData} />
            }
          </Layout>
        </Route>
    
        <Route path="/">
          <Layout title="Merchants Data" >
            {
              !err && merchantsData &&
              <MerchantsTable 
                merchantsData={merchantsData}
              />
            }
          </Layout>
        </Route>
      </Switch>
      <LoaderErrorComponent 
        merchantsData={merchantsData}
        callAPI={callAPI}
        err={err}
      />
    </Router>
  )
}

export default App;
