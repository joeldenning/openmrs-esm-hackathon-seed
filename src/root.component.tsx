import React from "react";
import ViewAllergies from "./view-allergies/view-allergies";
export default function AllergyWidget(props: AllergyWidgetProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Allergies</h5>
      </div>
      <ViewAllergies patientUuid={props.patientUuid} />
    </div>
  );
}

type AllergyWidgetProps = {
  patientUuid: string;
};
