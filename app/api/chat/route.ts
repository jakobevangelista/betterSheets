import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { cities } from "@/db/schema";
import OpenAI from "openai";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function POST(req: Request) {
  try {
    // check auth
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const request = await req.json();

    // check google auth service account
    if (
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    ) {
      return new NextResponse("No Google Private Key or Email", {
        status: 400,
      });
    }

    // setup jwt and openai
    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });

    const doc = new GoogleSpreadsheet(request.sheetId, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells();

    // start prompting
    const prompt =
      "You are an expert in google sheets and you want to help interpret what people what do do in google sheets. A user asks '{}'. Is the users problem able to be solved with a google sheets formula? Or not? Respond with one word, formula or not".replace(
        "{}",
        request.message
      );
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 7,
      temperature: 0,
    });

    // if formula, goes into this block
    if (completion.choices[0].text.toLowerCase().includes("formula")) {
      try {
        const formulaPrompt =
          "You are an expert in google sheets and you want to help interpret what people what do do in google sheets. A user asks '{}'. Respond with the formula, using colon format the user wants as well as the target cell the user want to put the formula in. Use the following format for response: Formula: [google sheets formula]\n Target Cell:[specific A1 format of target cell]".replace(
            "{}",
            request.message
          );
        const formulaPromptAnalyze = await openai.completions.create({
          model: "gpt-3.5-turbo-instruct",
          prompt: formulaPrompt,
          max_tokens: 100,
          temperature: 0,
        });
        const formulaOutputParse = formulaPromptAnalyze.choices[0].text
          .replace("Formula: ", "")
          .replace("Target Cell: ", "")
          .split("\n");

        const targetCell = sheet.getCellByA1(formulaOutputParse[3]);
        targetCell.value = formulaOutputParse[2];
        await sheet.saveUpdatedCells();

        return NextResponse.json({
          message:
            "I have put the formula '{formula}' in cell {cell}. \nLet me know if you have any more questions!"
              .replace("{formula}", formulaOutputParse[2])
              .replace("{cell}", formulaOutputParse[3]),
        });
      } catch (error) {
        console.error(error);
        return new NextResponse("CHAT_FORMULA_ERROR", { status: 400 });
      }
    }

    // if not formula, goes into this block
    if (completion.choices[0].text.toLowerCase().includes("not")) {
      const catchPrompt =
        "You are an expert in google sheets and you want to help interpret what people want do do in google sheets. A user asks '{}'. Respond 'Thank you for asking, I cannot automate that for you but here are the following steps:' followed by the steps needed to execute the users actions and make sure they are steps that are able to be done in google sheets. Make sure the steps are clear and simple and can be understood and followed by a 5th grader. Write the response in markdown format.".replace(
          "{}",
          request.message
        );
      const catchPromptAnalyze = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: catchPrompt,
        max_tokens: 250,
        temperature: 0,
      });

      console.log(catchPromptAnalyze.choices[0].text);

      return NextResponse.json({ message: catchPromptAnalyze.choices[0].text });
    }

    // if neither formula or not, goes into this block, should never happen
    return NextResponse.json({
      message:
        "I could not understand your response, please try rephrasing your question",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("CHAT_ERROR", { status: 400 });
  }
}
