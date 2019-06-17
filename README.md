# openmrs-esm-hackathon-seed
A seed repo for hackathons

## Instructions
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install [node and npm](https://nodejs.org/en/download/)
3. `git clone https://github.com/joeldenning/openmrs-esm-patient-dashboard.git`. Github link: https://github.com/joeldenning/openmrs-esm-patient-dashboard
4. Fork https://github.com/joeldenning/openmrs-esm-hackathon-seed. Clone your fork.
5. `npm install` inside of both repos
6. Inside of patient-dashboard, modify dashboard-widgets.tsx and add the following to the `patientDashboardParcels` array:
  `() => System.import('@openmrs/my-dashboard-widget')`. You should name your widget something besides `my-dashboard-widget`.
7. Inside of patient-dashboard, `npm start -- --https --no-inline --port 8081`
8. Inside of hackathon-seed, modify the file `set-public-path.tsx` to have the correct name for your dashboard widget.
9. In a new terminal, run the following inside of hackathon-seed: `npm start -- --https --no-inline --port 8082`
10. Go to https://openmrs-spa.org/openmrs/spa/login in a browser.
11. Now [trust all insecure localhost requests](https://superuser.com/questions/772762/how-can-i-disable-security-checks-for-localhost).
12. Open up the browser console and run the following commands:
```js
importMapOverrides.addOverride('@hackathon/patient-dashboard', 'https://localhost:8081/patient-dashboard.js');
importMapOverrides.addOverride('@openmrs/my-dashboard-widget', 'https://localhost:8082/hackathon-seed.js');
```
13. Refresh the page.
14. Login with username `admin` and password `admin123`.
15. Search for the patient called "hornblower". Click on the row in the table.
16. You should now see a widget that says "hackathon seed is working!"
17. Inside of hackathon-seed repo, modify the text inside of `root.component.tsx`.
18. In the browser, refresh the page. You should see your code modified.
