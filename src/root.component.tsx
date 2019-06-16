import React from "react";
import styles from "./root.component.css";

export default function Root(props: RootProps) {
  return <div className={styles.heading}>Hackathon seed is working!</div>;
}

type RootProps = {};
