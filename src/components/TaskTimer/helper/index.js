import moment from 'moment';

export const timeDifference = (date, shouldReturnInSeconds = false) => {
  const diff = moment
    .utc(moment.duration(moment().diff(moment(date))).asSeconds() * 1000)
    .format('HH:mm:ss');
  return shouldReturnInSeconds ? moment.duration(diff).asSeconds() : diff;
};

export const digitFormatter = (digit) => {
  return digit >= 10 ? digit : `0${digit}`;
};
