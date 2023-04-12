import { useContext } from 'react';

//Context
import ConceptContext from 'pages/Project/Context';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import ConceptTaskView from 'pages/Project/views/ConceptTaskView';
import ResponsiveDrawer from 'components/Common/ResponsiveDrawer';
import Campaign from 'pages/Campaign';

// Styles
import { useStyles } from 'pages/Project/styles';

const Extra = () => {
  const classes = useStyles();

  const { hideModal, isCampaignVisible, isTaskVisible, data } =
    useContext(ConceptContext);

  return (
    <>
      {/* Campaign Modal */}
      <ResponsiveDrawer
        content={
          isCampaignVisible && (
            <Campaign data={data} handleClose={() => hideModal('Campaigns')} />
          )
        }
        isOpen={isCampaignVisible}
        handleClose={hideModal}
      />
      {/* Task Modal */}
      {isTaskVisible && (
        <Modal
          open={isTaskVisible}
          onClose={() => hideModal('Tasks')}
          className={classes.modal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isTaskVisible}>
            <div className={classes.paper}>
              <ConceptTaskView data={data} />
            </div>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default Extra;
