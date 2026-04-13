// src/components/ui/Toast.tsx (optional wrapper - not required)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    //   stacked
      className={styles.toastContainer}
      toastClassName={styles.toast}
      progressClassName={styles.progress}
      closeButton={false}
    />
  );
};

export default ToastProvider;