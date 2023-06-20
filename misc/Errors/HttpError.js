class HttpError extends Error {
    constructor(code = 500, message,) {
        super(message);
        this.code = code;
    }
}

module.exports = HttpError;