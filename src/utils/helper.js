export const getMaximumValueId = (arr) => {
  let arrLen = arr.length;
  let max = -Infinity;
  let maxIndexId = 0;

  while(arrLen--) {

    if(arr[arrLen].amount > max) {
      max = arr[arrLen].amount;
      maxIndexId = arr[arrLen].id;
    }
  }

  return maxIndexId;
}

export const createMaxAndMinBidArrays = (arr, arrOfMaxBidId) => {

  let maxBidArray = [];
  let minBidArray = [];

  arr.forEach((ele, index) => {
    let minBidTempArr = [];
    let maxBidTempArr = [];

    ele.bids.forEach((bid) => {

      if(bid.length === 1) {
        maxBidTempArr.push(bid);
      }else{
        if(bid.id === arrOfMaxBidId[index]) {
          maxBidTempArr.push(bid);
        }else {
          minBidTempArr.push(bid);
        }
      }

    });
    minBidArray.push(minBidTempArr);
    maxBidArray.push(maxBidTempArr);
  });

  return {'maxBidArray': maxBidArray, 'minBidArray': minBidArray};
}