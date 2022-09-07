class RepositoryError extends Error {
    constructor(message, httpCode = 422) {
        super();
        this.status = httpCode;
        this.message = message
        Error.captureStackTrace(this, RepositoryError);
    }
}

module.exports = RepositoryError;