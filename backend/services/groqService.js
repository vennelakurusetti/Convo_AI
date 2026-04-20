const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const getAIResponse = async (question) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: question,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error('Failed to get AI response');
    }
};

module.exports = { getAIResponse };
