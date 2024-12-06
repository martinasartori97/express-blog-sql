//require ('dotenv').confing()




const express = require('express')
const app = express()
const PostsController = require('./controllers/posts-controllers');
const myRoutes = require('./routes/posts.js');
const cors = require('cors')

app.use(cors())
// const notFoundMiddleware = require('./middlewares/notFoundMiddleware.js')
// const loggerMiddleware = require('./middlewares/loggerMiddleware')

// app.use('/posts', (req, res, next) => {
//     throw new Error("You broke everything dude! 💥");
// });



const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json());
app.use(express.static('public'))


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:3000`)
});



app.get('/', (req, res) => {
    res.send('posts rest API')
});

//app.use('/', posts.js);

app.use("/posts", myRoutes);
// app.use(notFoundMiddleware);
// app.use('/posts', loggerMiddleware)





app.get('/posts', PostsController.index);
app.get('/posts/:title', PostsController.show);
app.post('/posts', PostsController.store);



app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
    console.error(err.stack);
    res.status(500).send({
        message: "Something went wrong",
        error: err.message
    })
});









