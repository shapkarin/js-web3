import { useState } from 'react';

/**
 * A custom React hook for managing Snackbar state.
 * 
 * This hook initializes with a default state for a Snackbar component, providing functions to show and close the Snackbar.
 * The `showSnackbar` function allows you to specify the message and severity for the Snackbar,
 * while `handleCloseSnackbar` can be used to hide it.
 * 
 * @param {Object} initialState - The initial state of the Snackbar, with default values if none are provided.
 * @param {boolean} initialState.open - Initial visibility state of the Snackbar.
 * @param {string} initialState.message - Initial message to be displayed in the Snackbar.
 * @param {'info' | 'success' | 'warning' | 'error'} initialState.severity - Initial severity type of the Snackbar.
 * 
 * @returns {Object} An object containing the Snackbar state, and functions to show and close the Snackbar.
 * @returns {Object} return.snackbar - The current state of the Snackbar.
 * @returns {Function} return.showSnackbar - Function to display the Snackbar with a specific message and severity.
 * @returns {Function} return.handleCloseSnackbar - Function to close the Snackbar.
 */
function useSnackbar(initialState = { open: false, message: '', severity: 'info' }) {
  const [snackbar, setSnackbar] = useState(initialState);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return { snackbar, showSnackbar, handleCloseSnackbar };
}

export default useSnackbar;
