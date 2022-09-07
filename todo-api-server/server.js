const todoListRepository = require('./repository/todoListRepository');

const fastify = require('fastify')({
    logger: true
})

const todoListBodyJsonSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        }
    }
};

const schema = {
    body: todoListBodyJsonSchema
}

fastify.get('/todolist/:todolistId', async (request, response) => {
    const id = request.params.todolistId;
    try {
        const todoList = await todoListRepository.findById(id);
        response.send(todoList);
    } catch (error) {
        response.statusCode = error.statusCode;
        response.errMessage = error.errMessage;
    }
});

fastify.post('/todolist/todo', {
    schema
}, async (request, response) => {
    const todo = await todoListRepository.create(request.body);
    response.send(todo);
});

const start = async () => {
    try {
        await fastify.listen({
            port: 3000
        })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();