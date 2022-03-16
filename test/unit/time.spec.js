import { Time } from "../../module/Time"
import { expect } from "chai"

describe("Time [unit]", () => {
    let stub

    beforeEach(() => {
        stub = new Time()
    })

    describe("#currentTime", () => {
        it("should return current time", () => {
            const today = new Date()
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            const now = date + ' ' + time

            const check = stub.currentTime()

            expect(check).to.equal(now)
        })
    })
})