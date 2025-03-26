import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const clarifyResearchGoals = async (topic: string) => {
  const prompt = `
    Given the research topic <topic>${topic}</topic>, generate2-4 clarifying questions to help narrow down the research scope. Focus on identifying:
    - Specifi aspects of interest
    - Required depth/complexity level
    - Any particular perspective or excluded sources
    `;

  try {
    const { object } = await generateObject({
      // model: openrouter("meta-llama/llama-3.3-70b-instruct"),
      // model: openrouter("google/gemini-2.0-flash-thinking-exp:free"),
      model: openrouter("google/gemini-2.0-flash-lite-preview-02-05:free"),
      prompt,
      schema: z.object({
        questions: z.array(z.string()),
      }),
    });

    return object.questions;
  } catch (error) {
    console.log("Error while generating questions: ", error);
  }
};

export async function POST(req: Request) {
  const { topic } = await req.json();
  console.log("Topic: ", topic);

  try {
    const questions = await clarifyResearchGoals(topic);
    console.log("Questions: ", questions);

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error while generating questions: ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate questions",
      },
      { status: 500 }
    );
  }
}
