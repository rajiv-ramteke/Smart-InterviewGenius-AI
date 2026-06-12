require('dotenv').config()
const OpenAI = require('openai')

const client = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1'
})

async function test() {
    // Test 1: List available models
    console.log("=== Test 1: Checking API Key validity ===")
    try {
        const models = await client.models.list()
        console.log("API Key is VALID! Available models:")
        for await (const m of models) {
            console.log(" -", m.id)
        }
    } catch (err) {
        console.log("Models list ERROR:", err.status, err.message)
    }

    // Test 2: Try a smaller/faster model
    console.log("\n=== Test 2: Testing with meta/llama-3.1-8b-instruct ===")
    try {
        const response = await client.chat.completions.create({
            model: 'meta/llama-3.1-8b-instruct',
            messages: [{ role: 'user', content: 'Reply with only: hello' }],
            temperature: 0.2,
            max_tokens: 20
        })
        console.log("8B Model SUCCESS:", response.choices[0].message.content)
    } catch (err) {
        console.log("8B Model ERROR:", err.status, err.message)
    }

    // Test 3: Try the 70b model
    console.log("\n=== Test 3: Testing with meta/llama-3.1-70b-instruct ===")
    try {
        const response = await client.chat.completions.create({
            model: 'meta/llama-3.1-70b-instruct',
            messages: [{ role: 'user', content: 'Reply with only: hello' }],
            temperature: 0.2,
            max_tokens: 20
        })
        console.log("70B Model SUCCESS:", response.choices[0].message.content)
    } catch (err) {
        console.log("70B Model ERROR:", err.status, err.message)
    }
}

test()
