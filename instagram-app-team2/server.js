const express = require('express');
const users=require('./routes/api/users');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//DB configuration
const db=require('./config/keys').mongoURI;

//connecting to mongodb
mongoose.connect(db)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err));

app.use('/api/users',users);

const port = 7000;
app.listen(port, () => console.log(`server is running ${port}`));