import { getAISummary } from "../agents/graph.js";

const testVenues = [
  { name: "Midtown Cafe", travelTimes: [1800, 2100, 1900] },
  { name: "East Side Diner", travelTimes: [2500, 1500, 2000] },
  { name: "Harlem Roast", travelTimes: [2200, 2200, 2200] },
];

const mode = "Equal Travel Time";

const summary = await getAISummary(testVenues, mode);
console.log("🧠 AI Summary:\n", summary);
