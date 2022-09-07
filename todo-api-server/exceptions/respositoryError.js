class RepositoryError extends Error {
    constructor(message, httpCode = 422) {
        super();
        this.status = httpCode;
        Error.captureStackTrace(this, RepositoryError);
    }
}

module.exports = RepositoryError;