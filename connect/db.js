const mongoose = require('mongoose');
require('dotenv').config();



    const connectDB = async () => {
        try {
         const uri = process.env.DB_URL;
         const conn = await mongoose.connect(uri, {
            // useNewUrlParser: true,
          });
          
          console.log(`MongoDB Connected:+ $ {conn.connection.host}`);

        } catch (error) {
          console.error(error.message);
          process.exit(1);
        }
      }


      module.exports = connectDB;