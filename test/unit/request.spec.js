import { Request } from "../../module/Request"
import { expect } from "chai"
import { AssignObjectError } from "../../module/Errors"
const requestModifier = require('../../config/requests/request-modifier-template.json')

describe("Request [unit]", () => {
    let stub

    beforeEach(() => {
        stub = new Request(requestModifier)
    })

    describe("#buildURL", () => {
        it("should return url with params", () => {
            const params = {
                "test": "test",
                "test1": "test1"
            }

            const url = stub.buildURL("https://google.com", params)

            expect(url).to.equal("https://google.com?test=test&test1=test1")
        })

        it("should return only clean url when no params", () => {
            const params = {}

            const url = stub.buildURL("https://google.com", params)

            expect(url).to.equal("https://google.com")
        })

        it("should ignore sent parameters which are not objects", () => {
            const params = null

            const url = stub.buildURL("https://google.com", params)

            expect(url).to.equal("https://google.com")
        })

    })

    describe("#setHeaders", () => {
        it("should add the request header paramaters", () => {
            let headers = {
                "test": "test"
            }
            stub.setHeaders(headers)

            expect(stub.headers.get("test")).to.equal("test")
        })

        it("should ignore sent parameters which are not objects", () => {
            let headers = null

            expect(() => stub.setHeaders(headers)).to.throw(AssignObjectError)
        })

        it("should update existing headers", () => {
            let headers = {
                "test": "test"
            }
            stub.setHeaders(headers)

            expect(stub.headers.get("test")).to.equal("test")

            headers = {
                "test": "test1"
            }

            stub.setHeaders(headers)

            expect(stub.headers.get("test")).to.equal("test1")
        })
    })

    describe("#setBodyParams", () => {
        it("should add the request body parameters", () => {
            let body = {
                "test": "test"
            }
            stub.setBodyParams(body)

            expect(stub.body.get("test")).to.equal("test")
        })

        it("should ignore sent parameters which are not objects ", () => {
            let body = null

            expect(() => stub.setBodyParams(body)).to.throw(AssignObjectError)
        })

        it("should update existing body parameters", () => {
            let body = {
                "test": "test"
            }
            stub.setBodyParams(body)

            expect(stub.body.get("test")).to.equal("test")

            body = {
                "test": "test1"
            }

            stub.setBodyParams(body)

            expect(stub.body.get("test")).to.equal("test1")
        })

        it("should add Content-Type Header", () => {
            let body = {
                "test": "test"
            }

            stub.setBodyParams(body)

            expect(stub.headers.get("Content-Type")).to.exist
        })
    })

    describe("#setContentType", () => {
        it("should add Content-Type header", () => {
            stub.setContentType("test")

            expect(stub.headers.get("Content-Type")).to.equal("test")
        })
        it("should update Content-Type header", () => {
            stub.setContentType("test")

            expect(stub.headers.get("Content-Type")).to.equal("test")

            stub.setContentType("test1")

            expect(stub.headers.get("Content-Type")).to.equal("test1")
        })
    })

    describe("#hasParamter", () => {
        it('will throw exception if Object is without any keys', () => {
            expect(stub.hasParmaters({})).to.be.eql(false)
        })

        it('retrive true if there is any keys indise the object paramater', () => {
            expect(stub.hasParmaters({ key1: 1, key2: 2 })).to.be.true

        })

        it('will throw exception if paramater is not an object', () => {
            expect(stub.hasParmaters(true)).to.be.eql(false)
        })

    })
})