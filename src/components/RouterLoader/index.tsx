import React from "react";
import Login from "@/pages/auth";
import styles from "./index.module.scss";

function RouterLoader() {
  return (
    <Login>
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className={styles.wheel_and_hamster}
      >
        <div className={styles.wheel}></div>
        <div className={styles.hamster}>
          <div className={styles.hamster__body}>
            <div className={styles.hamster__head}>
              <div className={styles.hamster__ear}></div>
              <div className={styles.hamster__eye}></div>
              <div className={styles.hamster__nose}></div>
            </div>
            <div className={`${styles.hamster__limb} ${styles.hamster__limb_fr}`}></div>
            <div className={`${styles.hamster__limb} ${styles.hamster__limb_fl}`}></div>
            <div className={`${styles.hamster__limb} ${styles.hamster__limb_br}`}></div>
            <div className={`${styles.hamster__limb} ${styles.hamster__limb_bl}`}></div>
            <div className={styles.hamster__tail}></div>
          </div>
        </div>
        <div className={styles.spoke}></div>
      </div>
    </Login>
  );
}

export default RouterLoader;
