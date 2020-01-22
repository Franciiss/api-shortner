var admin = require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-shortner-265819.firebaseio.com"
});

var db = admin.database();

const urlRef = db.ref("url");
const customAliasRef = db.ref("custom_alias");

exports.db = db;
exports.urlRef = urlRef;
exports.customAliasRef = customAliasRef;