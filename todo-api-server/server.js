const todoListRepository = require('./repository/todoListRepository');

const fastify = require('fastify')({
    logger: true
})

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

const start = async () => {
    try {
        await fastify.listen({
            port: 3000
        })
    } catch (err) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();