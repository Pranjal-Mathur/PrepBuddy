const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateReport(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;

        const aiReport = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...aiReport,
        });

        res.status(200).json({
            message: "Interview Report created successfully ",
            interviewReport,
        });
    } catch (error) {
        console.error("Generate Report Controller Error:", error);
        res.status(500).json({
            message: error.message || "Failed to generate report",
        });
    }
}

async function getReport(req, res) {
    try {
        const { interviewid } = req.params;

        const interviewReport = await interviewReportModel.findOne({ _id: interviewid, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        res.status(200).json({
            message: "Report fetched",
            interviewReport,
        });
    } catch (error) {
        console.error("Get Report Error:", error);
        res.status(500).json({
            message: "Failed to fetch report",
        });
    }
}

async function getAllReports(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription  -__v ");

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports,
        });
    } catch (error) {
        console.error("Get All Reports Error:", error);
        res.status(500).json({
            message: "Failed to fetch interview reports",
        });
    }
}

module.exports = { generateReport, getReport, getAllReports };
