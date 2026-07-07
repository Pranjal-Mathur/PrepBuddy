require('dotenv').config()
const app = require('./src/app')
const connectdb = require("./src/config/database");

connectdb()

app.listen(3000,()=>{
    console.log("Server started on port 3000...")
})