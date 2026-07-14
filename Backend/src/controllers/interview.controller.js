
const pdfParse = require("pdf-parse")
const {generateInterviewReport }= require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


async function generateReport(req,res){
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body

    const aiReport = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user : req.user.id , 
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...aiReport
    })

    res.status(200).json({
        message : "Interview Report created successfully ",
        interviewReport
    })




}

async function getReport(req,res){
    const {interviewid} = req.params ;

    const interviewReport = await interviewReportModel.findOne({_id:interviewid,user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message : "Report not found"
        })
    }

    res.status(200).json({
        message : "Report fetched",
        interviewReport
    })
}

async function getAllReports(req,res){
     const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription  -__v ")


     res.status(200).json({
         message: "Interview reports fetched successfully.",
         interviewReports
     })
}



module.exports = {generateReport,getReport,getAllReports}
