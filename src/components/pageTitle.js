import React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import '../App.css'

const PageTitle = (props) => {
  const {title} = props;

  return(
    <React.Fragment>
      <Grid container className="pageTitleContainer" >
        <Box my={2} px={1} pb={1} width={1} borderBottom='1px solid #e8e8e8' >
          <Typography variant="h5" >
            {title}
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

export default PageTitle;