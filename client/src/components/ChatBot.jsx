import React from 'react'
import ChatBot from 'react-chatbotify'
import { GoogleGenerativeAI } from '@google/generative-ai'
import settings from '../chatbot-resources/settings.json'
import styles from '../chatbot-resources/styles.json'

const MyChatBot = () => {
  let hasUpdated = false

  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_API_KEY
  )
  async function run(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  const flow = {
    start: {
      message: "Hello, I am your CodeMate , Ask me Questions!",
      path: "model_loop",
    },
    model_loop: {
      message: async (params) => {
        return await run(params.userInput);
      },
      path: "model_loop"
    },
  }
  return <ChatBot  settings={settings} styles={styles} flow={flow} />
}
export default MyChatBot
