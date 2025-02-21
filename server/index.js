const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5500;

// app.use(cors({
//   origin: ["http://localhost:3000", "https://deploy-mern-1whq.vercel.app"], // Replace with your frontend's Vercel URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));
app.use(cors());


const TodoItemRoute = require('./routes/todoItems');


mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);



//connect to server
app.listen(PORT, ()=> console.log("Server connected") );
