import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },

  floatingButton: {
    margin: 'auto',
    right: '-1px',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 'fit-content',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    transform: 'rotate(180deg)',
    writingMode: 'vertical-rl',
  },
  floatingText: {
    background: '#25165B',
    color: '#ffc156',
    borderRadius: '0 0.4em 0.4em 0',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1em 0.1em',
    cursor: 'pointer',
    userSelect: 'none',
  },
  content: {
    height: 'calc(100% - 7em)',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  drawer: {
    zIndex: 2,
  },
}));
