import { client } from "@gradio/client";

async function main() {
  const app = await client("https://b72d3b199c227e66b0.gradio.live/");
  const result = await app.predict("/predict", [
    "Hello!!", // string  in 'question' Textbox component
  ]);

  console.log(result.data);
}

main();
