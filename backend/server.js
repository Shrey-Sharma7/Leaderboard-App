const app = require('./app')

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

// const io = require('socket.io')(server);

