const admin = require('firebase-admin')
import {
    Firestore
} from '../firebase/firestore'
const Time = require('../Time')

export class User {
    constructor() {}

    /**
     * check if email already exist in firebase auth
     * @param {String} email 
     */
    async emailExist(email) {
        return await admin.auth().getUserByEmail(email).then(() => {
            return true
        }).catch(err => {
            if (err.code === 'auth/user-not-found') {
                return false
            }
        })
    }
}