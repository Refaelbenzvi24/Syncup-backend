const fetch = require('node-fetch')
const Headers = require('fetch-headers')
import { AssignObjectError } from './Errors'


export class Request {
    /**
     * @param  {Object} requestModifier
     */
    constructor(requestModifier) {
        if (requestModifier instanceof Object) {
            this.url = this.buildURL(requestModifier.url, requestModifier.url_params)
            this.options = { method: requestModifier.method }
            this.headers = new Headers()
            this.body = new URLSearchParams()
            this.setBodyParams(requestModifier.body_params)
            this.setHeaders(requestModifier.headers)
        } else throw (new Error("Request constructor can only get Object type parameter"))
    }


    /**
     * Send the request to the api.
     * @returns {string}   
     */
    async request() {
        const response = await fetch(this.url, this.options)
            .then(response => response.text())
            .catch(error => console.log('error: ' + error))
        return await response
    }

    /**
     * Build the whole url.
     * @param {*} url 
     * @param {*} urlParams 
     */

    buildURL(url, urlParams) {
        if (urlParams instanceof Object && Object.keys(urlParams).length > 0) {
            return url + '?' + this.composeUrlParams(urlParams)
        } else return url
    }


    /**
     * Build the headers.
     * @param {Object}
     */
    setHeaders(headers) {
        if (headers instanceof Object) {
            if (this.hasParmaters(headers)) {
                this.setParams(this.headers, headers)
                this.options.headers = this.headers
            }

        } else throw (new AssignObjectError('setHeaders'))
    }

    /**
     * Build the body.
     * @param {Object} bodyParams 
     */
    setBodyParams(bodyParams) {
        if (bodyParams instanceof Object) {
            if (this.hasParmaters(bodyParams)) {
                this.setParams(this.body, bodyParams)
                this.options.body = this.body
                this.setContentType()
            }
        } else {
            throw (new AssignObjectError('setBodyParams'))
        }
    }
    /**
     * Retrive if there is paramter inside the object.
     * @param {Object} parmater
     * @returns {Boolean}
     */
    hasParmaters(parmater) {
        return Object.keys(parmater).length > 0
    }


    /**
     * Utility for appending parameters.
     * @param { URLSearchParams(), Headers() } appendOn
     * @param  { Object } paramsToAppend
     */
    setParams(appendOn, paramsToSet) {
        const parameters = Object.entries(paramsToSet)

        parameters.forEach(parameter => {
            if (appendOn.has(parameter[0])) {
                appendOn.delete(parameter[0])
            }
            appendOn.append(parameter[0], parameter[1])
        })
    }


    /**
     * Utility for setting url parameters.
     * @param {Object} urlParams 
     */
    composeUrlParams(urlParams) {
        let composedParams = ''
        const parameters = Object.entries(urlParams)

        parameters.forEach((parameter, index) => {
            composedParams += parameter[0] + '=' + parameter[1]

            //composedParams += `${parameter[0]}=${parameter[1]}`

            parameters.length - 1 > index ? composedParams += '&' : null
        })

        return composedParams
    }

    /**
     * Set the body content type of the request
     * @param {string} type Content-Type.
     */
    // FIXME: allow the user to decide what's the "Content-Type"
    setContentType(type = "application/x-www-form-urlencoded") {
        if (this.isHeaderExist()) {
            this.headers.delete("Content-Type")
            this.headers.append("Content-Type", type)
        } else {
            this.headers.append("Content-Type", type)
        }
    }

    /**
     * retrieve if header is exist.
     * @returns {Boolean}
     */
    isHeaderExist() {
        return this.headers.get("Content-Type")
    }

}