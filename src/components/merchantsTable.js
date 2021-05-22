import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableContainer, TableCell, TableHead, TableRow, TablePagination, Paper, Box, Typography, Switch, FormControlLabel} from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {tableHeaderConstants} from '../utils/constants';
import moment from 'moment';
import {getMaximumValueId, createMaxAndMinBidArrays} from '../utils/helper';
import _ from 'lodash';

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
  const classes = useStyles();

  const [merchantsData, setMerchantsData] = useState(props.merchantsData);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchLabel, setSwitchLabel]     = useState('MAX'); 
  const [maxBidsArr, setMaxBidsArr]       = useState(null);
  const [minBidsArr, setMinBidsArr]       = useState(null);
  const [sortSwitch, setSortSwitch]       = useState(false);
  const [rowsPerPage, setRowsPerPage]     = useState(4);
  const [page, setPage]                   = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSortSwitchChange = (e) => {
    setSortSwitch(e.target.checked);

    if(e.target.checked) {
      let sorted = [...merchantsData].sort((a, b) => (b.bids.length && a.bids.length) ? b.bids[0].amount - a.bids[0].amount : null);
      setMerchantsData([...sorted])
    }else {
      let originalMerchantsData = props.merchantsData;

      originalMerchantsData.map((data, index) => {
        data.bids = maxBidsArr[index];
      });
      setMerchantsData(originalMerchantsData);
    }
  }

  const onSwitchStateChange = (e) => {
    setSwitchChecked(e.target.checked);
    setSortSwitch(false);

    if(e.target.checked) {
      setSwitchLabel('MAX');
      let merchantsDataCopy = [...props.merchantsData];

      merchantsDataCopy.map((data, index) => {
        data.bids = maxBidsArr[index];
      });

      setMerchantsData(merchantsDataCopy);
    }else {
      setSwitchLabel('MIN');
      let merchantsDataCopy = [...props.merchantsData];

      merchantsDataCopy.map((data, index) => {
        data.bids = minBidsArr[index];
      });

      setMerchantsData(merchantsDataCopy);
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

    let merchantsDataCopy = [...merchantsData];

    merchantsDataCopy.map((data, index) => {
      data.bids = maxBidArray[index];
    });

    setMerchantsData(merchantsDataCopy);

  }, []);

  return(
    <React.Fragment>
      {
        switchChecked &&
        <Box width={1} mt={1} >
          <FormControlLabel 
            label="Sort Data"
            control={
              <Switch 
                checked={sortSwitch}
                onChange={onSortSwitchChange}
                color='primary'
              />
            }
          />
        </Box>
      }
      <TableContainer component={Paper} >
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
              {
                tableHeaderConstants
                .map((header, index) => (
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
              merchantsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
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
                      data.bids.map((bid) => (
                        <Box my={1} display='flex' flexDirection='column' width={1} key={`bid-${bid.id}`} >
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
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={merchantsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </React.Fragment>
  )
}

export default MerchantsTable;