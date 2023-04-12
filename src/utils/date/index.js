import moment from 'moment';

export const formatDate = (date, format = 'LL') => {
  if (!date) return '-';
  const d = new Date(date);
  if (d.toString() === 'Invalid Date') return '-';
  return moment(d).format(format);
};

export const getDatesInRange = (startDate, endDate, format = 'LL') => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(formatDate(new Date(date), format));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const timeDifference = (date, shouldReturnInSeconds = false) => {
  const diff = moment
    .utc(moment.duration(moment().diff(moment(date))).asSeconds() * 1000)
    .format('HH:mm:ss');
  return shouldReturnInSeconds ? moment.duration(diff).asSeconds() : diff;
};

export const timeDifferenceRange = (
  fromDate,
  toDate,
  shouldReturnInSeconds = false
) => {
  const diff = moment
    .utc(
      moment.duration(moment(toDate).diff(moment(fromDate))).asSeconds() * 1000
    )
    .format('HH:mm:ss');
  return shouldReturnInSeconds ? moment.duration(diff).asSeconds() : diff;
};
