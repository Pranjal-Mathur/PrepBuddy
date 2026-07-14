require('dotenv').config()
const app = require('./src/app')
const connectdb = require("./src/config/database");
const {resume,selfDescription,jobDescription} = require("./src/services/temp")
const  {invokeGemini, generateInterviewReport}  = require('./src/services/ai.service');

connectdb()
console.log(invokeGemini);
// invokeGemini();
// generateInterviewReport({resume,selfDescription,jobDescription})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});