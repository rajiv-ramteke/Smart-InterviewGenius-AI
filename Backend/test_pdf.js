require('dotenv').config()
const mongoose = require('mongoose')
const { generateResumePdf } = require('./src/services/ai.service')

async function testPdfGeneration() {
    console.log("Starting PDF generation test...")
    try {
        const pdfBuffer = await generateResumePdf({
            resume: "Rajiv Ganesh Ramteke, Frontend Developer with 2 years of React experience.",
            selfDescription: "",
            jobDescription: "Looking for a React developer with Node.js knowledge."
        })
        console.log("SUCCESS! PDF Buffer length:", pdfBuffer.length)
    } catch (err) {
        console.error("ERROR CAUGHT:")
        console.error(err)
    }
}

testPdfGeneration()
