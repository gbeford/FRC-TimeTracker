// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:5000/',
  studentApiUrl: 'api/student',
  signInStudentUrl: 'api/student/signIn',
  signOutStudentUrl: 'api/student/signOut',
  signOutAllStudentsUrl: 'api/student/signOutAll',
  messageApiUrl: 'api/messages',
  eventApiUrl: 'api/events',
  logInUrl: 'api/login',
  logiOutUrl: 'api/logout',
  login: 'api/security/login_user',
  addMessagesToStudentUrl: 'api/Student/AddMessagesToStudent',
  removeMessageFromStudent: 'api/Student/RemoveMessageFromStudent',
  apparelApiUrl: 'api/apparel',
  imageApiUrl: 'api/apparelImage',
  imageNameApiUrl: 'api/apparelImage/GetImageNames',
  studentAttendanceUrl: 'api/Reports/Attendance',
  orderApiUrl: 'api/order',
  markPaidOrders: 'api/order/MarkPaid/',
  orderDetailsApiUrl: 'api/order/OrderReport',
};
