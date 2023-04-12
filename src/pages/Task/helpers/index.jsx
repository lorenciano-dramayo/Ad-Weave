import moment from 'moment';

export const dateFormatter = (date) => {
  var daysLeftInMilliSec = Math.abs(
    new Date(moment().format('YYYY-MM-DD')) -
      new Date(moment(date).format('YYYY-MM-DD'))
  );
  var daysLeft = daysLeftInMilliSec / (1000 * 60 * 60 * 24);

  if (daysLeft > 0 && daysLeft < 2) {
    return moment(date).calendar();
  } else if (daysLeft < 1) {
    return moment(date).startOf('seconds').fromNow();
  } else {
    return moment(date).format('MMMM DD [at] hh:mm A');
  }
};

export const dateChecker = (d) => {
  let dueDate = new Date(moment(d).format('YYYY-MM-DD hh:mm:ss'));
  let curDate = new Date(moment().format('YYYY-MM-DD hh:mm:ss'));
  let dateDifference = Math.round((curDate - dueDate) / 1000 / 60 / 60);

  return dateDifference >= -2 && dateDifference <= 0
    ? 'Critical'
    : dateDifference < -2
    ? 'track'
    : 'Overdue';
};

export const getFileType = (d) => {
  if (d.match(/.(jpg|jpeg|png|gif)$/i)) {
    return 'image';
  } else if (d.match(/.(docx|doc|pdf)$/i)) {
    return 'document';
  } else if (d.match(/.(mp4|mov|mkv|flv)$/i)) {
    return 'video';
  } else {
    return 'others';
  }
};

export const getFileTypeSpecific = (d) => {
  if (d.match(/.(jpg|jpeg|png|gif)$/i)) {
    return 'image';
  } else if (d.match(/.(docx|doc)$/i)) {
    return 'word';
  } else if (d.match(/.(pdf)$/i)) {
    return 'pdf';
  } else if (d.match(/.(excel|xls|xlsx)$/i)) {
    return 'excel';
  } else if (d.match(/.(ppt|pptx)$/i)) {
    return 'powerpoint';
  } else if (d.match(/.(mp4|mov|mkv|flv)$/i)) {
    return 'video';
  } else {
    return 'others';
  }
};
