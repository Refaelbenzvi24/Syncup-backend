const express = require("express")
const router = express.Router()
const path = require("path")
import { User } from '../../../module/users/user'

/**
 * sign up a user in firestore DB.
 */
router.post("/", (res, req) => {
    let SignUp = new User(res.body.username, res.body.email, res.body.password)
    SignUp.signUp()
    //TODO: catch errors
    req.status(202)
    req.send('Created')
})

module.exports = router