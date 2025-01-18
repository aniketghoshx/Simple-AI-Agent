import "dotenv/config"
import readlineSync from "readline-sync";
import { model, generationConfig } from "./utils/gemini";
import { Content } from "@google/generative-ai";
import { getWeatherDetails } from "./utils/weather";


const tools = {
  getWeatherDetails: getWeatherDetails,
};

const messages: Content[] = []

async function main() {
  while (true) {
    const query = readlineSync.question(">> ");
    const q = {
      type: "user",
      user: query,
    };
    messages.push({ role: "user", parts: [{ text: JSON.stringify(q) }] });

    while (true) {
      const chat = await model.generateContent({
        contents: messages,
        generationConfig,
      });

      const result = chat.response.text();

      // console.log("\n\n--------------------------");
      // console.log(result);
      // console.log("------------------------\n\n")

      messages.push({ role: "model", parts: [{text: result} ]});

      const call = JSON.parse(result);
      if (call.type == "output") {
        console.log(`\n\n🤖: ${call.output}\n\n`);
        break;
      } else if (call.type == "action") {
        // @ts-ignore
        const fn = tools[call.function];
        const observation = await fn(call.input);
        const obs = { type: "observation", observation: observation };
        messages.push({ role: "model", parts: [{ text: JSON.stringify(obs) }] });
      }
    }
  }
}

main();
