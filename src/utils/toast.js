import { toast } from 'react-toastify';

/**
 * Toast utility functions using React Toastify
 * Provides consistent toast notifications across the app
 */

const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  },

  error: (message, options = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  },

  warning: (message, options = {}) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },

  info: (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  update: (toastId, options) => {
    toast.update(toastId, options);
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        pending: messages.pending || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
      },
      { ...defaultOptions, ...options }
    );
  },
};

export default showToast;