const couchbase = require('couchbase');
const connectionManager = require('./connectionManager')
const RepositoryError = require('../exceptions/respositoryError');
const {
    v4: uuidv4
} = require('uuid');

async function getTodoList() {
    cluster = await connectionManager.couchbaseConnect();
    const bucket = await cluster.bucket('todolist');
    const scope = bucket.scope('todolist');
    try {
        const result = await scope.query(`SELECT meta().id, name, status
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
    const bucket = await cluster.bucket('todolist');
    const scope = bucket.scope('todolist');
    const data = { "name": todo.name, "status": 'new' }
    const key = uuidv4();
    const query = `INSERT INTO \`todolist\`
                   VALUES ("${key}",{ "name": "${todo.name}", "status": "new" })
                   returning {meta().id, name, status} as todo`
    try {
        const result = await scope.query(query);
        return result.rows[0];
    } catch (err) {
        if (err instanceof couchbase.DocumentExistsError) {
            throw new RepositoryError('Document already exists for todo', 500);
        }
        throw err;
    }
}

async function remove(id) {
    cluster = await connectionManager.couchbaseConnect();
    const bucket = await cluster.bucket('todolist');
    const scope = bucket.scope('todolist');
    const query = `DELETE
                   FROM \`todolist\`
                   WHERE meta().id=\"${id}\" RETURNING META().id;`;
    try {
        const todos = await scope.query(query);
        return todos.rows[0].id;
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