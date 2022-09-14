const cors = require('@fastify/cors');

const fastify = require('fastify')({
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
})

fastify.register(
    cors, { origin: true }
)


const todoListRepository = require('./repository/todoListRepository');

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

fastify.get('/api/todolist', async (request, response) => {
    try {
        const todolist = await todoListRepository.getTodoList();
        response.send(todolist);
    } catch (error) {
        response.send({
            status: error.status,
            message: error.message
        })
    }
})

fastify.get('/api/todolist/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const todoList = await todoListRepository.findById(id);
        response.send(todoList);
    } catch (error) {
        response.send({
            status: error.status,
            message: error.message
        })

    }
});

fastify.post('/api/todolist/todo', {
    schema
}, async (request, response) => {
    try {
        const todo = await todoListRepository.create(request.body);
        response.send(todo);
    } catch (error) {
        response.send({
            status: error.status,
            message: error.message
        })
    }
});

fastify.delete('/api/todolist/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const todo = await todoListRepository.remove(id);
        response.send(todo);
    } catch (error) {
        response.send({
            status: error.status,
            message: error.message
        })
    }
});

const start = async () => {
    try {
        await fastify.listen({
            port: 5000
        })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();