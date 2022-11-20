const express = require('express');

const app = express();

const cors = require('cors')

// const session = require('express-session')

// const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config({path: 'config.env'});

const MongoDBURI = process.env.MongoDBURI;


// const store = new MongoDBStore({
//         uri: MongoDBURI,
//         collection: 'session',
// })

// app.use(session({ secret: 'my_secret', resave: false, saveUninitialized: false, store: store, cookie:{maxAge: 3600000} }))
app.use(express.json())


const mongoose = require('mongoose');



const port  = process.env.PORT || 8080;


const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes')
const userRoutes = require('./routes/userRoutes')
app.use(cors())

app.use((req,res,next)=>{
    res.setHeader('Access_Control_Allow_Origin', '*');
    res.setHeader('Access_Control_Allow_Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access_Control_Allow_Headers', 'Content_Type, Authorization');
    next()
    
})
app.use(authRoutes)
app.use(donorRoutes)
app.use(userRoutes)

app.get('/',(req,res,next)=>{
    // console.log(req.session.test)
    res.send('this is a node app')
})

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    console.log('message', message)
    const data = error.data;
    console.log('data', data)
    res.status(status).send({
        message: message,
        data: data
    })
})


    mongoose.connect(
        MongoDBURI
    )
    .then(res=>{
        app.listen(port,()=>{
            console.log('Database Connected Successfully!')
        })
    })
    .catch(err=>{
        console.log(err)
    })
