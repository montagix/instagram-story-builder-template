import { Toaster as ExternalToaster } from 'react-hot-toast';
import './Toaster.styles.scss';

const Toaster = () => (
  <ExternalToaster
    containerStyle={{ position: 'absolute' }}
    toastOptions={{
      success: {
        className: 'toast toast--success',
      },
      error: {
        className: 'toast toast--error',
      },
    }}
  />
);

export default Toaster;
