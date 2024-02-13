import { Snackbar, Alert } from '@mui/material';
import useSnackbar from '../Hooks/useSnackbar';

/**
 * Displays a Snackbar component from Material-UI with an Alert inside. This component is used to show feedback messages to users.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls the visibility of the snackbar. If true, the snackbar is shown.
 * @param {string} props.message - The message to display inside the alert component of the snackbar.
 * @param {'success' | 'info' | 'warning' | 'error'} props.severity - The severity of the alert. This defines the color and icon used.
 * @param {Function} props.handleClose - The function to call when the snackbar needs to be closed. It's triggered on timeout or if the user dismisses the alert.
 * 
 * @see {@link https://mui.com/material-ui/react-snackbar/} for the Snackbar component API in MUI.
 * @see {@link https://mui.com/material-ui/react-alert/} for the Alert component API in MUI.
 * 
 */
function SnackbarComponent() {
    const { snackbar, handleCloseSnackbar } = useSnackbar();
  
    return (
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <AlertComponent handleClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </AlertComponent>
      </Snackbar>
    );
  }
  
  
function AlertComponent({ message, severity, handleClose }) {
    return (
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    );
  }
  

export default SnackbarComponent;
