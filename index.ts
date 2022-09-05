import { removeEmojis } from "@nlpjs/emoji";

import { dockStart } from "@nlpjs/basic";
import { Normalizer } from "@nlpjs/core";

const normalizer = new Normalizer();

let manager;

async function train(nlp) {
  const dock = await dockStart({ use: ["Basic"] });
  nlp = dock.get("nlp");

  await nlp.addCorpus("./corpus.json");
  nlp.addLanguage("en");

  await nlp.train();

  return nlp;
}

async function compute(nlp, msg, options = {}): string {
  let name: string = process.env.name || "Simply-Chatbot",
    bplace: string = process.env.birthplace || "Discord",
    age: string | number = process.env.age || "1",
    dev: string = process.env.developer || "Rahuletto",
    bday: string = process.envs.bday || "31 February 2021",
    gender: string = process.env.gender || "Male",
    year: string = process.env.year || "2021";

  // normalizes the message (removes unwanted unicodes)
  msg = normalizer.normalize(msg);

  let reply = await nlp.process(removeEmojis(msg));

  // replaces string to customize the model easily
  // remove this for loop if you think its useless for you
  reply.answers.forEach(async (anz) => {
    anz.answer =
      anz.answer.charAt(0).toUpperCase() +
      anz.answer
        .slice(1)
        .replaceAll("{{name}}", name)
        .replaceAll("{{bplace}}", bplace)
        .replaceAll("{{age}}", age)
        .replaceAll("{{dev}}", dev)
        .replaceAll("{{bday}}", bday)
        .replaceAll("{{gender}}", gender);
  });

  reply.answer =
    reply.answer.charAt(0).toUpperCase() +
    reply.answer
      .slice(1)
      .replaceAll("{{name}}", name)
      .replaceAll("{{bplace}}", bplace)
      .replaceAll("{{age}}", age)
      .replaceAll("{{dev}}", dev)
      .replaceAll("{{bday}}", bday)
      .replaceAll("{{gender}}", gender);

  // Returns the whole Object to work with
  console.log(reply);

  // Response Template (Use the values from the object for your needs)
  // input = 'hi'
  /*
{
  locale: 'en',
  utterance: 'hi', // the input
  settings: {...},
  language: 'English',
  classifications: [
    { intent: 'greetings.hello', score: 1 }, // Guessing the input type
    {...}
  ],
  intent: 'greetings.hello', // final guess
  score: 1, // accuracy of the guess
  answers: [...] // Array of answers
  answer: 'Greetings !', // Random answer from the array
  actions: [],
  sentiment: {...} // The type of the speech
}
*/
}

// The input given to the bot
let input: string = "Hello !";

// trains the nlp with corpus.json (Data)
train(manager).then(async (nlp) => {
  // computes the message for a response
  compute(nlp, input);
});
