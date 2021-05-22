import React from 'react';
import {Box, Typography, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {currencySymbol} from '../utils/helper';

const useStyles = makeStyles(theme => ({
  paper: {
    boxShadow: '0 1px 7px 0 #e8e8e8',
    width: '100%'
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  custName: {
    color: '#26c6da',
    fontSize: 18,
    fontWeight: 500
  },
  fontBold: {
    fontWeight: 600,
    fontSize: 20
  }
}));

const MerchantsCard = (props) => {
  const {data} = props;

  const classes = useStyles();

  return(

    <Box p={2} >
      <Box width={1} my={1} display='flex' justifyContent='center' >
        <Avatar 
          src={data.avatarUrl}
          alt={data.firstname + " " + data.lastname}
          className={classes.avatar}
        />
      </Box>

      <Box my={1} width={1} display='flex' justifyContent='center' alignItems='center' >
        <Typography className={classes.custName} >
          {data.firstname + " " + data.lastname}
        </Typography>
        {
          data.hasPremium &&
          <StarIcon style={{color: '#ffd600'}} />
        }
      </Box>
      
      <Box p={1} boxShadow={'0 1px 7px 0 #e8e8e8'} height={300} overflow='auto' >
        <Box my={1} textAlign='center' >
          <Typography className={classes.fontBold} >
            BIDS
          </Typography>
        </Box>
        {
          data.bids.map((bid, index) => (
            <Box 
              width={1} 
              mt={1} 
              mb={2} 
              display='flex' 
              alignItems='center' 
              justifyContent='space-between' 
              key={index} 
              borderBottom={index !== data.bids.length - 1 ? "1px solid #e8e8e8" : null}
            >
              <Typography>
                {bid.carTitle}
              </Typography>

              <Typography>
                {currencySymbol('INR')} {bid.amount}
              </Typography>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default MerchantsCard;