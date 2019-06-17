# openmrs-esm-hackathon-seed
A seed repo for hackathons

## Instructions
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install [node and npm](https://nodejs.org/en/download/)
3. `git clone git clone https://github.com/joeldenning/openmrs-esm-patient-dashboard.git`
4. Fork https://github.com/joeldenning/openmrs-esm-hackathon-seed. Clone your fork.
5. `npm install` inside of both repos
6. Inside of patient-dashboard, modify dashboard-widgets.js and add the following to the `patientDashboardWidgets` array:
  `() => System.import('@openmrs/my-dashboard-widget'),`. You should name your widget something besides `my-dashboard-widget`.
7. Inside of patient-dashboard, `npm start -- --https --no-inline --port 8081`
8. In a new terminal, run the following inside of hackathon-seed: `npm start -- --https --no-inline --port 8082`
9. Go to https://openmrs-spa.org/openmsr/spa/login in a browser.
10. Open up the browser console and run the following commands:
```js
importMapOverrides.addOverride('@hackathon/patient-dashboard', 'https://localhost:8081/patient-dashboard.js')
importMapOverrides.addOverride('@hackathon/my-dashboard-widget', 'https://localhost:8082/hackathon-seed.js')
```
11. Refresh the page.
12. Login with username `admin` and password `admin123`.
13. Search for the patient called "hornblower".
14. You should now see a widget that says "hackathon seed is working!"
15. Inside of hackathon-seed repo, modify the text inside of `root.component.js`.
16. In the browser, refresh the page. You should see your code modified.

### Step 1 - Add your widget to patient dashboard
- In a new terminal window, fork https://github.com/joeldenning/openmrs-esm-patient-dashboard
- `npm install`
- 
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
