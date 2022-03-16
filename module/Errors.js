/**
 * Throw Error when parameter should only get Object
 */
export class AssignObjectError extends Error {
    /**
     * @param {String} func The function name 
     */
    constructor(func) {
        super(`${func}() can only handle Object type parameters`)
    }
}