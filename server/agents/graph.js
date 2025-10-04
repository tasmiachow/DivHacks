import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-4-turbo",   // or gpt-3.5-turbo to save credits
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

const prompt = new PromptTemplate({
  inputVariables: ["mode", "venues"],
  template: `
You're helping a group of friends pick the fairest meetup location in New York City.

Fairness Mode: {mode}
Top Venues (with travel times in seconds):
{venues}

Write a short, friendly 1 sentence explanation of each location and why it makes it fair based on the mode.
Reference travel time balance if it's relevant.
  `,
});

const chain = RunnableSequence.from([
  prompt,
  model,
]);

export async function getAISummary(venues, mode) {
  try {
    // 🧠 Use .invoke() instead of .call()
    const res = await chain.invoke({
      mode,
      venues: JSON.stringify(venues, null, 2),
    });

    // 📝 For ChatOpenAI, the content is in res.content
    return res.content;
  } catch (err) {
    console.error("❌ AI Summary error:", err);
    return "Could not generate summary.";
  }
}
