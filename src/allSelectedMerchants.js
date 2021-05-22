import React, {useEffect, useState} from 'react';
import {Grid, Box, Typography, } from '@material-ui/core';
import MerchantsCard from './components/merchantsCard';

const AllMerchants = (props) => {
  const {merchantsData} = props;

  const [specificUsersData, setSpecificUsersData] = useState(null);
  const [err, setErr]                             = useState(false);

  useEffect(() => {
    let usersArray = window.localStorage.getItem('usersArray');
    usersArray = JSON.parse(usersArray);

    try{
      let temp = [];
      usersArray.forEach((ele) => {
        merchantsData.forEach(data => {
          if(data.id === ele) {
            temp.push(data);
          }
        });
      })

      setSpecificUsersData(temp);
    }catch(err) {
      setErr(true);
    }
  }, []);

  return(
    <Grid container justify='center' >
      {
        !err && specificUsersData &&
        specificUsersData.map((data, index) => (
          <Grid item md={4} xs={12} sm={12} key={index} >
              <MerchantsCard 
                data={data}
              />
          </Grid>
        ))
      }

      {
        err &&
        <Box width={1} textAlign='center' my={3} >
          <Typography>
            Data you are trying to access is no longer available. Please close this tab and try again.
          </Typography>
        </Box>
      }
    </Grid>
  )
}

export default AllMerchants;