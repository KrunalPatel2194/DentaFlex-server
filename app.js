require('dotenv').config();
const express =  require('express');
const app = express();
const cors = require("cors");
// const connection = require("./connect/db.js");
const connectDB = require('./connect/db.js');
const authRoutes = require('./routes/auth.js');



//middlewares
app.use(express.json())
app.use(express.urlencoded({expected:true}))
app.use(cors());

//Database Connection
connectDB();
app.use('/api/auth/', authRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening on`, PORT)
})