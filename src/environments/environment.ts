// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase_467_timeTracker: {
    apiKey: 'AIzaSyDtP3U8t0hKvhUdoRtLbT2CNuB5aVL3zEY',
    authDomain: 'timetrackersandbox.firebaseapp.com',
    databaseURL: 'https://timetrackersandbox.firebaseio.com',
    projectId: 'timetrackersandbox',
    storageBucket: 'timetrackersandbox.appspot.com',
    messagingSenderId: '843771130494'
  },
  // firebase_467_timeTracker: {
  //   apiKey: 'AIzaSyDLKFASaeQE14QdTQ7CdmD1D7nFxas4gcc',
  //   authDomain: 'time-tracker-467.firebaseapp.com',
  //   databaseURL: 'https://time-tracker-467.firebaseio.com',
  //   projectId: 'time-tracker-467',
  //   storageBucket: 'time-tracker-467.appspot.com',
  //   messagingSenderId: '220924576055'
  // }

  studentApiUrl: 'http://localhost:5000/api/student',
  timeTrackerApiUrl: 'http://localhost:5000/api/studenttimes',

};
