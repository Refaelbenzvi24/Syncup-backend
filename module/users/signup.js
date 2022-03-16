import { Firestore } from '../firebase/firestore'
const Time = new require('../Time')

export class SignUp {
    constructor(username, email, password) {
        this.fields = this.buildFields(username, email, password)
        this.collection = 'Users'
        this.Users = new Firestore
    }


    /**
     * Save user to DB
     */
    // signUp() {
    //     this.Users.set(this.collection, this.fields)
    // }

    // /**
    //  * 
    //  * @param {String} username 
    //  * @param {String} email 
    //  * @param {String} password 
    //  */
    // buildFields(username, email, password) {
    //     return {
    //         username: username,
    //         email: email,
    //         password: password,
    //         createdTime: Time.currentTime()
    //     }
    // }
}