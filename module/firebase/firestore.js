// import { Firebase } from '../firebase'
const admin = require("firebase-admin")

export class Firestore {
  constructor() {
    this.db = admin.firestore()
  }

  set(collection, fields) {
    this.db.collection(collection).add(fields)
  }
}

// const Firebase = require('../firebase.js')
// const admin = require('firebase-admin')
// const serviceAccount = require("./serviceAccountKey.json")
// const collectionKey = "Access Tokens"

// class Firestore extends Firebase {
//     constructor() {
//         super()
//     }

//     saveData(data) {
//         if (data && (typeof data === "object")) {
//             Object.keys(data).forEach(docKey => {
//                 firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
//                     console.log(res);
//                     console.log("Document " + docKey + " successfully written!")
//                 }).catch((error) => {
//                     console.error("Error writing document: ", error)
//                 })
//             })
//         }
//     }
// }

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),`
//     databaseURL: "https://sync-cal-to-todo.firebaseio.com"
// })

// const firestore = admin.firestore();
// ``
// const settings = {
//     timestampsInSnapshots: true
// }

// firestore.settings(settings);
// module.exports = Firestore
