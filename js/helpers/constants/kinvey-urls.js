'use strict';

import {appKeys} from 'app-keys';

let KINVEY_BASE_URL = 'https://baas.kinvey.com/';
let KINVEY_REGISTER_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/`;
let KINVEY_LOGIN_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/login`;
let KINVEY_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}`;
let KINVEY_BASE_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}`;
let KINVEY_LOGOUT_USER_URL = `${KINVEY_BASE_URL}user/${appKeys.APP_KEY}/_logout`;

const kinveyUrls = {
  KINVEY_LOGIN_USER_URL,
  KINVEY_REGISTER_USER_URL,
  KINVEY_USER_URL,
  KINVEY_LOGOUT_USER_URL,
  KINVEY_BASE_USER_URL
};
export {kinveyUrls};