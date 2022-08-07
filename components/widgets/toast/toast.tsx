import classNames from "classnames";
import toast from "react-hot-toast";
import { HiLightningBolt } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

import styles from "./toast.module.css";

export const showToast = (
  title: string,
  message: string,
  position: string = "top-center"
) => {
  toast(message, {
    duration: 100000,
    icon: "👍",
    className: "bg-red-500",
    style: {},
  });
};
export const ___showToast = (
  title: string,
  message: string,
  position: string = "top-center"
) => {
  toast.custom((t) => (
    <div
      className={classNames([
        styles.notificationWrapper,
        t.visible ? "top-0" : "-top-96",
      ])}
    >
      <div className={styles.iconWrapper}>
        <HiLightningBolt />
      </div>
      <div className={styles.contentWrapper}>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
      <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
        <MdOutlineClose />
      </div>
    </div>
  ));
};
