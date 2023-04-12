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
    },
    paper: {
        backgroundColor: 'white',
        height: '90%',
        width: '90%',
        boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
        borderRadius: '25px',
    },
}));
