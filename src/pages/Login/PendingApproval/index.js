// React
import { useDispatch } from 'react-redux';
// MUI
import { styled } from '@mui/styles';
import { Container, Stack, Typography } from '@mui/material';
// App hooks
import useRouteGuard from 'hooks/useRouteGuard';
// App Components
import Button from 'components/Common/Button';
// Reducers
import { logout } from 'store/reducers/auth';
// Icons
import PendingApprovalIcon from 'assets/icons/icon_pending_approval.png';

const StyledIcon = styled('img')({
  marginBottom: 50,
  width: 140,
});

const StyledLabel = styled(Typography)({
  fontSize: '0.95rem',
  fontWeight: 300,
});

const PendingApproval = () => {
  useRouteGuard();

  const dispatch = useDispatch();

  const handleReturnToLoginClick = () => {
    dispatch(logout());
  };

  return (
    <Container
      disableGutters={true}
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <StyledIcon alt="icon" src={PendingApprovalIcon} />
      <Stack spacing={3} justifyContent="center" alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '2.3rem' }}>
          Pending Approval.
        </Typography>
        <Stack justifyContent="center" alignItems="center" lineHeight={1.5}>
          <StyledLabel variant="p">
            Thank you for registering your account at our website.
          </StyledLabel>
          <StyledLabel variant="p">
            Your account need the <b>approval</b> before login.
          </StyledLabel>
          <StyledLabel variant="p">We hope for your kind waiting.</StyledLabel>
        </Stack>
        <Stack justifyContent="center" alignItems="center" lineHeight={1.5}>
          <StyledLabel variant="p">
            Please contact us if you have any questions.
          </StyledLabel>
          <StyledLabel variant="p">Best Regards,</StyledLabel>
        </Stack>
        <Button
          onClick={handleReturnToLoginClick}
          type="button"
          variant="outlined"
          color="primary"
          sx={{ marginTop: '50px !important', width: '50%' }}
        >
          Return to Login
        </Button>
      </Stack>
    </Container>
  );
};

export default PendingApproval;
