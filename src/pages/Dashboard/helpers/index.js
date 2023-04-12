import moment from 'moment';

export const getHealthPercentage = (submitted, due) => {
    let startOfDate = moment(submitted),
        endDate = moment(due),
        todayDate = moment();

    const daysDifference = moment(endDate).diff(startOfDate, 'minutes');
    const difference = todayDate.diff(startOfDate, 'minutes');

    const result = Math.round((difference / daysDifference) * 100);

    return result;
}