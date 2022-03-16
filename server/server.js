const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
let serviceAccount = require("../config/firebase-adminsdk.json");
const cors = require("cors");
let NODE_ENV;
process.env.NODE_ENV = "development";

class Server {
    constructor() {
        this.app = express();
    }
    /**
     * This method starts the Server.
     * @param  {number} port
     */
    initializeServer(port) {
        if (NODE_ENV !== "production") {
            this.app.use(cors());
        }
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.app.use("/", routes);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.boot(port);
    }

    boot(port) {
        this.app.listen(port, function() {
            console.log(`Example app listening on port ${port}.`);
            console.log(`http://localhost:${port}`);
        });
    }
}

module.exports = Server;
