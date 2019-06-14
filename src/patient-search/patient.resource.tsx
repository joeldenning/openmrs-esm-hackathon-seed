export function doSearch(term: string) {
  return fetch(`/openmrs/ws/rest/v1/patient?q=${term}&v=full`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Error. Server responded with ${res.status}`);
    }
  });
}
