const couchbase = require('couchbase');
const connectionManager = require('./connectionManager')
const {
    v4: uuidv4
} = require('uuid');

async function findById(key) {
    // Initialize the cluster, bucket and scope
    cluster = await connectionManager.couchbaseConnect();
    bucket = await connectionManager.getBucket('todolist');
    scope = await connectionManager.getScope('todolist');
    console.log(cluster);
    console.log(bucket);
    console.log(scope);
    // And select the collection
    const collection = scope.collection('todolist');
    try {
        const result = await collection.get(key);
        return result.content;
    } catch (err) {
        console.error(err);
        if (err instanceof couchbase.DocumentNotFoundError) {
            throw new RepositoryError(`Failed to load todolist for key: ${key}`)
        }
        throw err;
    }
}

/**
 * Export the defined public methods
 */
// Key/Value methods
exports.findById = findById;