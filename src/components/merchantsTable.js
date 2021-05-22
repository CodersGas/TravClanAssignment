import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Paper, Box, Typography, Switch, FormControlLabel} from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {tableHeaderConstants} from '../utils/constants';
import moment from 'moment';
import {getMaximumValueId, createMaxAndMinBidArrays} from '../utils/helper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#e0f7fa',
    color: '#000',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  labelText: {
    color: '#757575',
    fontSize: '14px'
  }
});

const MerchantsTable = (props) => {
  
  const {merchantsData} = props;
  const classes = useStyles();

  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchLabel, setSwitchLabel]     = useState('MAX'); 
  const [maxBidsArr, setMaxBidsArr]   = useState(null);
  const [minBidsArr, setMinBidsArr]       = useState(null);

  const onSwitchStateChange = (e) => {
    setSwitchChecked(e.target.checked)

    if(e.target.checked) {
      setSwitchLabel('MAX');
    }else {
      setSwitchLabel('MIN');
    }
  }

  useEffect(() => {
    let maxIndexIdsArr = [];

    merchantsData.forEach((data) => {
      let index = getMaximumValueId(data.bids);
      maxIndexIdsArr.push(index);
    });

    let {maxBidArray, minBidArray} = createMaxAndMinBidArrays(merchantsData, maxIndexIdsArr);
    setMaxBidsArr(maxBidArray);
    setMinBidsArr(minBidArray);

  }, []);

  return(
    <TableContainer component={Paper} >
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            {
              tableHeaderConstants.map((header, index) => (
                <StyledTableCell key={`header-${index}`} >
                  {header}
                  {
                    header === 'Bids' &&
                    <Box width={1} mt={1} >
                      <FormControlLabel 
                        label={switchLabel}
                        control={
                          <Switch 
                            checked={switchChecked}
                            onChange={onSwitchStateChange}
                            color='primary'
                          />
                        }
                      />
                    </Box>
                  }
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            merchantsData.map((data, index) => (
              <StyledTableRow key={`row-${index}`} >

                <StyledTableCell>
                  {data.firstname + " " + data.lastname}
                  {/* Add avatar */}
                </StyledTableCell>

                <StyledTableCell>
                  {data.email}
                </StyledTableCell>

                <StyledTableCell>
                  {data.phone}
                </StyledTableCell>

                <StyledTableCell>
                  {data.premium} 
                  {/* Add Icon for premium */}
                </StyledTableCell>

                <StyledTableCell>
                  {
                    (switchChecked && maxBidsArr) &&
                    maxBidsArr[index].map((bid) => (
                      <Box display='flex' flexDirection='column' width={1} key={`bid-${bid.id}`} >
                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Title : </span>  {bid.carTitle}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Amount : </span> {bid.amount}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Created At : </span> {moment(parseInt(bid.created)).format('DD MMM, YYYY')}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  }

                  {
                    !switchChecked &&
                    minBidsArr[index].map((bid) => (
                      <Box my={1} display='flex' flexDirection='column' width={1} key={`bid-${bid.id}`} borderBottom='1px dotted #000' >
                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Title : </span>  {bid.carTitle}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Amount : </span> {bid.amount}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography>
                            <span className={classes.labelText} >Created At : </span> {moment(parseInt(bid.created)).format('DD MMM, YYYY')}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  }
                </StyledTableCell>

              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MerchantsTable;