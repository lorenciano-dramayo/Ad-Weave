import { makeStyles } from '@mui/styles';
import { appColors } from 'theme/variables';

// Styles
export const useStyles = makeStyles(() => ({
  statusCompleted: {
    backgroundColor: appColors.status.completed,
    color: 'white',
  },
  statusInprogress: {
    backgroundColor: appColors.status.inProgress,
    color: 'white',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em 0 2em 50px',
  },
  paper: {
    backgroundColor: 'white',
    width: '90%',
    minHeight: '-webkit-fill-available',
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    borderRadius: '15px',
    overflow: 'hidden',
  },
  responseSummaryContainer: {
    backgroundColor: 'white',
    width: '60%',
    minHeight: '30%',
    borderRadius: '15px',
    overflow: 'hidden',
  },
  previewModal: {
    backgroundColor: 'white',
    width: '30%',
    height: '50vh',
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    borderRadius: '15px',
    overflow: 'hidden',
  },
}));
