import React from "react";
import PatientSearch from "./patient-search/patient-search";
import { BrowserRouter, Route } from "react-router-dom";

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename="/openmrs/spa">
      <Route to="patient-search" component={PatientSearch} />
    </BrowserRouter>
  );
}

type RootProps = {};
