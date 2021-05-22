import React from "react";
import {Box, Typography, Button} from '@material-ui/core';

const LoaderErrorComponent = (props) => {
  
  const {callAPI, merchantsData, err} = props;

  return(
    <React.Fragment>
      {
        !merchantsData && !err &&
        <Box display='flex' my={2} justifyContent='center' >
          <img 
            src={'./doubleRingLoader.gif'}
            width="56px"
            height="56px"
            alt="Loading..."
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
    </React.Fragment>
  )
}

export default LoaderErrorComponent;