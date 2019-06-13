# openmrs-esm-hackathon-seed
A seed repo for hackathons

## Instructions
### Step 1 - Add your widget to patient dashboard
- In a new terminal window, fork https://github.com/joeldenning/openmrs-esm-patient-dashboard
- `npm install`
- Modify dashboard-widgets.js and add the following to the `patientDashboardWidgets` array:
  `() => System.import('@hackathon/dashboard-widget'),`. You should name your widget something besides `dashboard-widget`.
  For example, name it `@hackathon/vitals`
- Make a pull request to https://github.com/joeldenning/openmrs-esm-patient-dashboard with your new widget

### Step 2 - Implement your widget
- Fork and/or clone this repo (https://github.com/joeldenning/openmrs-esm-root-config)
- `npm install`
- `npm start -- --https --port 8085`
- Now go to https://openmrs-spa.org/openmrs/spa/login. Run the following commands in browser console:
  `importMapOverrides.addOverride('@hackathon/dashboard-widget', 'https://localhost:8085/hackathon-seed.js')`
- Now [trust all insecure localhost requests](https://superuser.com/questions/772762/how-can-i-disable-security-checks-for-localhost).
  In Firefox, you'll have to trust the certificate individually by going to https://localhost:8085/hackathon-seed.js.
- Refresh browser
- Login
- You should see your widget in the patient dashboard