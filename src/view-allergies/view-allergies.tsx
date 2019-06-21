import React from "react";
import CreateAllergies from "../add-allergy/create-allergy";
import dayjs from "dayjs";

export default function ViewAllergies(props: PatientUuidProps) {
  let [allergies, setAllergies] = React.useState(null);
  const [addAllergyUI, setAddAllergyUI] = React.useState(false);

  React.useEffect(() => {
    fetch(`/openmrs/ws/rest/v1/patient/${props.patientUuid}/allergy?v=full`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(`Cannot fetch visits`);
        }
      })
      .then(allergies => {
        setAllergies(allergies);
      });
  }, []);

  return allergies ? renderValues(allergies) : renderLoader();

  function renderLoader() {
    return <div>No allergies...</div>;
  }

  function renderValues(allergies) {
    return (
      <div>
        <table className="table table-striped">
          <tr>
            <th>Allergen</th>
            <th>Reaction</th>
            <th>Severity</th>
            <th>comment</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </table>
        {allergies.results.map(result => renderAllergies(result))}

        <button className="filled" onClick={onclickAdd}>
          Add New Allergy
        </button>
        {addAllergyUI ? addNewAllergy() : null}
      </div>
    );
  }
  function renderAllergies(r) {
    return (
      <div>
        <table className="table table-striped">
          <tr>
            <td>{r.allergen.codedAllergen.display}</td>
            <td>{r.reactions[0].reaction.display}</td>
            <td>{r.severity.display}</td>
            <td>{r.comment}</td>
            <td>{dayjs(r.auditInfo.dateCreated).format("YYYY:MM:DD")}</td>
            <td>
              <button className="outlined" onClick={event => onClickDelete(r)}>
                <i className="fa fa-trash text-danger"></i>
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  function onclickAdd() {
    setAddAllergyUI(true);
  }

  function onClickDelete(allergy) {
    const requestOptions = {
      method: "DELETE"
    };
    fetch(
      `/openmrs/ws/rest/v1/patient/${props.patientUuid}/allergy/${allergy.uuid}`,
      requestOptions
    )
      .then(response => {
        return response;
      })
      .then(result => {});
  }

  function addNewAllergy() {
    return (
      <div>
        <CreateAllergies
          patientUuid={props.patientUuid}
          addAllergy={addAllergy}
        />
      </div>
    );
  }

  function addAllergy(allergy) {
    const newAllergies = allergies.results.push(allergy);
    setAllergies(allergies);
  }
}

type PatientUuidProps = {
  patientUuid: string;
};
