# openmrs-esm-hackathon-seed
A seed repo for hackathons

## Instructions
- Fork and/or clone this repo
- `npm install`
- `npm start -- --https --port 8085`
- In a new terminal window, clone (don't fork) https://github.com/joeldenning/openmrs-esm-patient-dashboard
- `npm install`
- Modify dashboard-widgets.js and add the following to the `patientDashboardWidgets` array:
a) `() => System.import('@hackathon/dashboard-widget'),`
- `npm start -- --https --port 8086`
- Now go to https://openmrs-spa.org/openmrs/spa/login. Run the following commands in browser console:
a) `importMapOverrides.addOverride('@hackathon/dashboard-widget', 'https://localhost:8085/hackathon-seed.js')`
b) `importMapOverrides.addOverride('@hackathon/patient-dashboard', 'https://localhost:8086/patient-dashboard.js')`
- Now [trust all insecure localhost requests](https://superuser.com/questions/772762/how-can-i-disable-security-checks-for-localhost).
  In Firefox, you'll have to trust the certificate individually by going to https://localhost:8085/hackathon-seed.js.
- Refresh browser
- Login
- You should see a few widgets on the patient dashboard.
