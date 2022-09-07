const couchbase = require('couchbase');
const connectionManager = require('./connectionManager')
const RepositoryError = require('../exceptions/respositoryError');
const {
    v4: uuidv4
} = require('uuid');

async function findById(key) {
    // Initialize the cluster, bucket and scope
    cluster = await connectionManager.couchbaseConnect();
    bucket = await connectionManager.getBucket('todolist');
    scope = await connectionManager.getScope('todolist');
    // And select the collection
    const collection = scope.collection('todolist');
    try {
        const result = await collection.get(key);
        return result.content;
    } catch (err) {
        if (err instanceof couchbase.DocumentNotFoundError) {
            return {
                statusCode: 404,
                errMessage: err.name
            }
        }
        throw err;
    }
}

async function create(todo) {
    cluster = await connectionManager.couchbaseConnect();
    bucket = await connectionManager.getBucket('todolist');
    scope = await connectionManager.getScope('todolist');
    // And select the collection
    const collection = scope.collection('todolist');
    const key = uuidv4();
    try {
        const result = await collection.insert(key, todo);
        return key;
    } catch (err) {
        if (err instanceof couchbase.DocumentExistsError) {
            throw new RepositoryError('Document already exists for todo');
        }
        throw err;
    }
}
/**
 * Export the defined public methods
 */
// Key/Value methods
exports.findById = findById;
exports.create = create;