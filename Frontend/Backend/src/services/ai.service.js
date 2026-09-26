const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job describe"
        },

        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The technical question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The behavioral question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The skill which the candidate is lacking"
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description: "The severity of this skill gap"
                    }
                },
                required: ["skill", "severity"]
            }
        },

        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.INTEGER,
                        description: "Day number"
                    },
                    focus: {
                        type: Type.STRING,
                        description: "Focus of the day"
                    },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Tasks for the day",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ]
};

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
Generate an interview report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema
            }
        });

        const report = JSON.parse(response.text);

        console.dir(report, { depth: null });

        return report;        

    } catch (err) {

        console.error("Gemini Error:", err);

        throw err;
    }
}

module.exports = {
    generateInterviewReport
};