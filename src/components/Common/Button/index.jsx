// MUI
import { styled } from '@mui/styles';
import LoadingButton from '@mui/lab/LoadingButton';
// Utilities
import PropTypes from 'prop-types';

const StyledButton = styled(LoadingButton)(({ variant }) => ({
  marginTop: variant ? '0.5rem' : 0,
  marginBottom: variant ? '0.5rem' : 0,
  padding: variant ? '0.6em 1.4em' : 0,
  borderRadius: '3px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
}));

const Button = ({ className, children, ...props }) => {
  return (
    <StyledButton disableElevation={true} className={className} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    ),
    PropTypes.element,
    PropTypes.string,
  ]),
  variant: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
