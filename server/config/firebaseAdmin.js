// This file initializes Firebase Admin SDK for server-side operations
const admin = require("firebase-admin");
const serviceAccount = require("../util/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

module.exports = admin;
