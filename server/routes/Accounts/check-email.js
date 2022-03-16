const express = require("express")
const router = express.Router()
const path = require("path")
import {
    User
} from '../../../module/users/user'


/**
 * check if email already exist in firebase auth.
 */
router.post("/", async (res, req) => {
    let EmailExist = new User()
    let emailExist = await EmailExist.emailExist(res.body.email)
    //TODO: catch errors
    if (emailExist) {
        req.status(200)
        req.json('email-taken')
    } else {
        req.status(200)
        req.json('no-such-email')
    }
})

module.exports = router