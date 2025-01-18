import { Content, GoogleGenerativeAI } from "@google/generative-ai";

import  {SYSTEM_PROMT}  from "./promt";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMT },
);

export const generationConfig = {
//   temperature: 0.9,
//   topK: 1,
//   topP: 1,
  maxOutputTokens: 2048,
  response_mime_type: "application/json",
};
