import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

function Card(props) {
  const { info } = props
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Number</span>
        <span className={styles.number}>{info.number}</span>
        <span className={styles.detail}>
          <span className={info.detail>0 ? styles.positive : styles.negative }>{info.detail}% </span><span>{info.detail>0 ? 'more' : 'less' }</span> than previous week
        </span>
      </div>
    </div>
  );
}

export default Card;
