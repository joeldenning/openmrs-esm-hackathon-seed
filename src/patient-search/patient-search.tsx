import React from "react";
import { doSearch } from "./patient.resource";

export default function PatientSearch(props: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [patientResults, setPatientResults] = React.useState([]);
  const [resultsLoaded, setResultsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isSearching) {
      doSearch(searchTerm)
        .then(data => {
          setPatientResults(data["results"]);
          setResultsLoaded(true);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  });

  function handleSubmit($event: React.FormEvent<HTMLFormElement>) {
    $event.preventDefault();
    setIsSearching(true);
    setResultsLoaded(false);
  }

  function navigateToPatientDashboard(patientUuid) {
    props.history.push(`/patient-dashboard/${patientUuid}`);
  }

  return (
    <div>
      Patient Search
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name or identifier to search"
          value={searchTerm}
          onChange={$event => setSearchTerm($event.target.value)}
        ></input>
        <button type="submit">{isSearching ? "Searching..." : "Search"}</button>
      </form>
      {resultsLoaded ? (
        patientResults.length ? (
          <table>
            <tr>
              <th>Identifiers</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            {patientResults.map(result => [
              <tr onClick={() => navigateToPatientDashboard(result.uuid)}>
                <td>
                  {result.identifiers
                    .map(identifier => identifier.identifier)
                    .join(",")}
                </td>
                <td>{result.person.display}</td>
                <td>{result.person.age}</td>
                <td>{result.person.gender}</td>
              </tr>
            ])}
          </table>
        ) : (
          <p> No results to display </p>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

type PatientSearchProps = {
  history?: {
    push(newUrl: String): void;
  };
};
