const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");
require("dotenv").config();

// 🧠 Initialize the model
const model = new ChatOpenAI({
  modelName: "gpt-4-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

// ✍️ Clean, structured prompt for consistent outputs
const prompt = new PromptTemplate({
    inputVariables: ["mode", "venues"],
    template: `
  You are an assistant helping a group of friends choose the fairest meetup location in New York City.
  
  Fairness Mode: {mode}
  
  Top Candidate Venues (with travel times in MINUTES):
  {venues}
  
  For each venue, write a single clear and friendly sentence explaining:
  - Why it fits the fairness mode
  - Notable differences in travel times, if any
  
  Format the output as a numbered list (1., 2., 3.) with no extra commentary.
    `,
  });

  
// ⛓️ Create the runnable chain
const chain = RunnableSequence.from([prompt, model]);

// 🧠 Generate the summary
async function getAISummary(venues, mode) {
  try {
    const res = await chain.invoke({
      mode,
      venues: JSON.stringify(venues, null, 2),
    });
    return res.content;
  } catch (err) {
    console.error("❌ AI Summary error:", err);
    return "Could not generate summary.";
  }
}

module.exports = { getAISummary };
