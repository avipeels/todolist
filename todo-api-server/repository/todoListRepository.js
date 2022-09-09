const couchbase = require('couchbase');
const connectionManager = require('./connectionManager')
const RepositoryError = require('../exceptions/respositoryError');
const {
    v4: uuidv4
} = require('uuid');

async function getTodoList() {
    cluster = await connectionManager.couchbaseConnect();
    const bucket = await cluster.bucket('todolist');
    // scope = await connectionManager.getBucket('todolist');
    const scope = bucket.scope('todolist');
    try {
        const result = await scope.query(`SELECT *
                                               FROM \`todolist\``);
        return result.rows;
    } catch (err) {
        if (err instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError('Document doesnot exist', 404);
        }
        throw err;
    }
}

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
            throw new RepositoryError('Document doesnot exist', 404);
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

async function remove(id) {
    cluster = await connectionManager.couchbaseConnect();
    bucket = await connectionManager.getBucket('todolist');
    scope = await connectionManager.getScope('todolist');
    const collection = scope.collection('todolist');
    try {
        const todo = await collection.remove(id);
    } catch (err) {
        if (err instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError('Document doesnot exist', 404);
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
exports.remove = remove;
exports.getTodoList = getTodoList;