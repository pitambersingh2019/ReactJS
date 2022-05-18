import styled, { keyframes } from "styled-components";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";
import LoadingToast from "./LoadingToast";
import CloseRounded from "@material-ui/icons/CloseRounded";
import "react-toastify/dist/ReactToastify.css";
import { PromiseToastInterface } from "./type";
import { isRtl } from "../../AppStart";

const Toastify__trackProgress = keyframes`
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

export const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  /* .toast-container */
  width: 400px;
  /* .toast is passed to toastClassName */
  .toast {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    height: 60px;
    padding: 8px 16px 8px 8px;
    border-radius: 4px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #c5c9cf;
  }

  button[aria-label="close"] {
    display: none;
  }
  /* .body is passed to bodyClassName */
  .body {
    padding: 0;
  }
  /* .progress is passed to progressClassName */
  .progress {
    animation: ${Toastify__trackProgress} linear 1;
  }

  &.Toastify__toast-container--bottom-right {
    bottom: 100px;
    right: 1em;
  }
  &.Toastify__toast-container--bottom-left {
    bottom: 100px;
    left: 1em;
  }
`;

const CloseButton = (props: any) => {
  const { closeToast } = props;
  return <CloseRounded onClick={closeToast} />;
};

export const notifySuccessToast = (
  Title: string,
  subTitle: string,
  delay: number,
  position: ToastPosition = isRtl() === "rtl" ? "bottom-left" : "bottom-right"
) => {
  toast(<SuccessToast TitleText={Title} subTitleText={subTitle} />, {
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    closeButton: CloseButton,
  });
};

export const notifyErrorToast = (
  Title: string,
  subTitle: string,
  delay: number,
  position: ToastPosition = isRtl() === "rtl" ? "bottom-left" : "bottom-right"
) => {
  toast(<ErrorToast TitleText={Title} subTitleText={subTitle} />, {
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    closeButton: CloseButton,
  });
};

export const notifyPromiseToast = (
  Details: PromiseToastInterface,
  promise: Promise<any>,
  onClose?: () => void,
  position: ToastPosition = isRtl() === "rtl" ? "bottom-left" : "bottom-right"
) => {
  //const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  toast.promise(
    promise,
    {
      pending: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render({ data }) {
          // When the promise reject, data will contains the error
          return (
            <LoadingToast
              TitleText={Details.pending.Title}
              subTitleText={Details.pending.SubTitle}
            />
          );
        },
        icon: false,
      },
      success: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render({ data }) {
          // When the promise reject, data will contains the error
          return (
            <SuccessToast
              TitleText={Details.success.Title}
              subTitleText={Details.success.SubTitle}
            />
          );
        },
        icon: false,
      },
      error: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render({ data }) {
          // When the promise reject, data will contains the error
          return (
            <ErrorToast
              TitleText={Details.error.Title}
              subTitleText={Details.error.SubTitle}
            />
          );
        },
        icon: false,
      },
    },
    {
      position: position,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: CloseButton,
      onClose: () => (onClose ? onClose() : null),
    }
  );
};
