import React, {useEffect, useState} from 'react';
import {Grid,Table, TableBody, TableContainer, TableCell, TableHead, TableRow, TablePagination, Paper, Box, Typography, Switch, FormControlLabel, Checkbox, Avatar, Button} from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {tableHeaderConstants} from '../utils/constants';
import moment from 'moment';
import {getMaximumValueId, createMaxAndMinBidArrays} from '../utils/helper';
import StarIcon from '@material-ui/icons/Star';
import '../App.css';
import {currencySymbol} from '../utils/helper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#26c6da',
    color: '#000',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff',
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },
  labelText: {
    color: '#757575',
    fontSize: '14px'
  },
  tableContainer: {
    boxShadow: '0 1px 7px 0 #e8e8e8'
  },
  custName: {
    color: '#26c6da',
    fontSize: 16,
    fontWeight: 500
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: 8
  }
}));

const TableRowComponent = (props) => {
  const {data, index, updateCheckedCount} = props;
  const classes = useStyles();

  const [checkedState, setCheckedState] = useState(false);

  const onCheckStateChange = (e, id) => {
    setCheckedState(e.target.checked);

    if(e.target.checked) {
      updateCheckedCount('add', id);
    }else {
      updateCheckedCount('sub', id);
    }
  }

  return(
    <StyledTableRow key={`row-${index}`} >
      <StyledTableCell>
        <Box width={1} mt={1} >
          <FormControlLabel 
            control={
              <Checkbox 
                checked={checkedState}
                onChange={(e) => onCheckStateChange(e, data.id)}
                color='primary'
              />
            }
          />
        </Box>
      </StyledTableCell>
      <StyledTableCell>
        <Box
          display='flex'
          alignItems='center'
        > 
          <Avatar 
            src={data.avatarUrl}
            alt={data.firstname + " " + data.lastname}
            className={classes.avatar}
          />
          <span className={classes.custName} >{data.firstname + " " + data.lastname}</span>
        </Box>
      </StyledTableCell>

      <StyledTableCell>
        {data.email}
      </StyledTableCell>

      <StyledTableCell>
        {data.phone}
      </StyledTableCell>

      <StyledTableCell>
        {
          data.hasPremium &&
          <StarIcon style={{color: '#ffd600'}} />
        }
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
                  <span className={classes.labelText} >Amount : </span> {currencySymbol('INR')} {bid.amount}
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
  )
}

const MerchantsTable = (props) => {
  const classes = useStyles();

  const [merchantsData, setMerchantsData]     = useState(props.merchantsData);
  const [switchChecked, setSwitchChecked]     = useState(true);
  const [switchLabel, setSwitchLabel]         = useState('MAX'); 
  const [maxBidsArr, setMaxBidsArr]           = useState(null);
  const [minBidsArr, setMinBidsArr]           = useState(null);
  const [sortSwitch, setSortSwitch]           = useState(false);
  const [rowsPerPage, setRowsPerPage]         = useState(4);
  const [page, setPage]                       = useState(0);
  const [checkedCount, setCheckedCount]       = useState(0);
  const [checkedUsersIds, setCheckedUsersIds] = useState([]);

  const updateCheckedCount = (type, id) => {
    let userIds = [...checkedUsersIds];
    if(type === 'add') {
      setCheckedCount(checkedCount + 1);
      userIds.push(id);
    }else {
      setCheckedCount(checkedCount - 1);
      userIds = userIds.filter((thisId) => thisId !== id);
    }

    setCheckedUsersIds([...userIds]);
  }

  const onViewClick = () => {
    window.localStorage.setItem('usersArray', JSON.stringify(checkedUsersIds));
    window.open('./allSelectedMerchants', '_blank');
  }

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

      originalMerchantsData.forEach((data, index) => {
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

      merchantsDataCopy.forEach((data, index) => {
        data.bids = maxBidsArr[index];
      });

      setMerchantsData(merchantsDataCopy);
    }else {
      setSwitchLabel('MIN');
      let merchantsDataCopy = [...props.merchantsData];

      merchantsDataCopy.forEach((data, index) => {
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

    merchantsDataCopy.forEach((data, index) => {
      data.bids = maxBidArray[index];
    });

    setMerchantsData(merchantsDataCopy);

  }, []);

  return(
    <Grid container justify='center' > 
      <Grid item md={10} xs={12} sm={12} >
        {
          <Box width={1} my={1} display='flex' alignItems='center' justifyContent='space-between' >
            {
              switchChecked &&
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
            }

            {
              checkedCount > 0 &&
              <Button variant='contained' disableElevation color='primary' onClick={onViewClick} >
                View
              </Button>
            }
          </Box>
        }
        <TableContainer component={Paper} className={classes.tableContainer} >
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
                  <TableRowComponent data={data} key={index} index={index} updateCheckedCount={updateCheckedCount} />
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
      </Grid>
    </Grid>
  )
}

export default MerchantsTable;