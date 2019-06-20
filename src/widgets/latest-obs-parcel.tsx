import React from "react";

export default function LatestObs(props: ObsProps) {
  const [obs, setVisit] = React.useState(null);

  /**
   * Add the list of concepts uuid to be tracked by this widget
   */
  const [trackedConceptsList] = React.useState([
    "165095AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  ]);

  React.useEffect(() => {
    const queryParams = `custom:(uuid,display,value,obsDatetime,concept:(uuid,name:(uuid,display,name)))`.replace(
      /\s/g,
      ""
    );

    fetch(
      `/openmrs/ws/rest/v1/latestobs?concept=${trackedConceptsList.join(
        ","
      )}&patient=${props.patientUuid}&v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch visits information for patient ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(obs => {
        setVisit(obs.results);
      });
  }, []);
  return obs ? renderObs() : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function renderObs() {
    return (
      <ul className="list-group">
        {obs.map((ob, index2) => {
          return <li className="list-group-item">{ob.display}</li>;
        })}
      </ul>
    );
  }
}

type ObsProps = {
  patientUuid: string;
};
