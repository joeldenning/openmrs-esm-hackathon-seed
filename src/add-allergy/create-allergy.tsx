import React from "react";

export default function CreateAllergies(props: PatientUuidProps) {
  const [allergenType, setAllergenType] = React.useState(null);
  const [codedAllergen, setCodedAllergen] = React.useState(null);
  const [severity, setSeverity] = React.useState(null);
  const [comment, setComment] = React.useState(null);
  const [reaction, setReaction] = React.useState(null);

  const [allergens, setAllergens] = React.useState(null);
  const [reactions, setReactions] = React.useState(null);
  const [severitys, setSeveritys] = React.useState(null);

  React.useEffect(() => {
    fetch(`/openmrs/ws/rest/v1/concept?v=full`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(`Cannot fetch visits`);
        }
      })
      .then(severitys => {
        setSeveritys(getSeverity(severitys.results));
      });

    fetch(`/openmrs/ws/rest/v1/concept?v=full`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(`Cannot fetch visits`);
        }
      })
      .then(reactions => {
        setReactions(getReactions(reactions.results));
      });

    fetch(`/openmrs/ws/rest/v1/concept?v=full`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(`Cannot fetch visits`);
        }
      })
      .then(allergens => {
        setAllergens(getAllergens(allergens.results));
      });
  }, []);

  function getReactions(reactions) {
    let values = [];
    reactions.forEach(reaction => {
      if (reaction.conceptClass.display == "Diagnosis") values.push(reaction);
    });

    return values;
  }

  function getAllergens(response) {
    let values = [];
    response.forEach(reaction => {
      if (reaction.conceptClass.display == "Diagnosis") values.push(reaction);
    });

    return values;
  }

  function getSeverity(response) {
    let values = [];
    response.forEach(reaction => {
      if (reaction.conceptClass.display == "Finding") values.push(reaction);
    });

    return values;
  }

  return reactions ? renderValues() : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function handleSubmit() {
    event.preventDefault();
    let payload = {
      allergen: {
        allergenType: allergenType,
        codedAllergen: codedAllergen
      },
      severity: severity,
      comment: comment,
      reactions: [
        {
          reaction: reaction
        }
      ]
    };
    fetch(
      "/openmrs/ws/rest/v1/patient/90f7f0b4-06a8-4a97-9678-e7a977f4b518/allergy",
      {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        window.location.reload();
      });
    // event.currentTarget.reset();
  }

  function renderValues() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Add New Allergy</h3>
          <div className="row">
            <div className="col-md-6">
              <label>
                Select Allergen Type
                <br />
                <select
                  className="form-control"
                  name="type"
                  value={allergenType}
                  onChange={event => setAllergenType(event.target.value)}
                >
                  <option value=""></option>
                  <option value="DRUG">Drug</option>
                  <option value="FOOD">Food</option>
                  <option value="OTHER">Other</option>
                </select>
              </label>
              <br />

              <label>
                Select Allergen
                <br />
                <select
                  className="form-control"
                  name="allergen"
                  value={codedAllergen}
                  onChange={event => setCodedAllergen(event.target.value)}
                >
                  <option value=""></option>
                  <option value="162298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    ACE inhibitors
                  </option>
                  <option value="162299AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    ARBs (angiotensin II receptor blockers)
                  </option>
                  <option value="71617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    Aspirin
                  </option>
                  <option value="162301AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    Cephalosporins
                  </option>
                  <option value="73667AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    Codeine
                  </option>
                </select>
              </label>
              <br />
              <label>
                Reactions: (check all that apply):
                {reactions.map(result => (
                  <div>
                    <input
                      name="reaction"
                      value={result.uuid}
                      type="checkbox"
                      onChange={event => setReaction(event.target.value)}
                    />
                    <label>{result.display}</label>
                  </div>
                ))}
              </label>
              <br />
              <label>
                Comment <br />
                <textarea
                  name="comment"
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                  placeholder="comment"
                />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </div>
            <div className="col-md-6">
              <label>
                Saverity
                {reactions.map(result => (
                  <div>
                    <input
                      name="severity"
                      value={result.uuid}
                      type="radio"
                      onChange={event => setSeverity(event.target.value)}
                    />
                    <label>{result.display}</label>
                  </div>
                ))}
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
type PatientUuidProps = {
  patientUuid: string;
};
