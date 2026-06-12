require('dotenv').config();
const mongoose = require('mongoose');
const InterviewReport = require('./src/models/interviewReport.model.js');

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    const latest = await InterviewReport.findOne().sort({ createdAt: -1 });
    console.log("Tech Questions Count:", latest.technicalQuestions ? latest.technicalQuestions.length : 0);
    console.log("First Tech Q:", latest.technicalQuestions[0]?.question);
    console.log("Last Tech Q:", latest.technicalQuestions[latest.technicalQuestions.length-1]?.question);
    process.exit(0);
}
run();
