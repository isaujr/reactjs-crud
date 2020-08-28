import * as firebase from "firebase";
const configs = require("./config");

var firebaseConfig = {
    apiKey: configs.api_key,
    authDomain: configs.auth_domain,
    databaseURL: configs.db_url,
    projectId: configs.projectid,
    storageBucket: configs.storage,
    messagingSenderId: configs.msg_sender,
    appId: configs.appid
  };

  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();

