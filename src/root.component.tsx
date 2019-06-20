import React from "react";
import LatestObs from "./widgets/latest-obs-parcel";

export default function Root(props: RootProps) {
  return (
    <div>
      <div className="test">
        <h2>{"Latest Observations"}</h2>
      </div>
      <LatestObs patientUuid={props.patientUuid} />
    </div>
  );
}

type RootProps = {
  patientUuid: string;
};
