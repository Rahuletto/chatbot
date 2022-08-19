const { removeEmojis } = require("@nlpjs/emoji");

const { dockStart } = require("@nlpjs/basic");
const { Normalizer } = require("@nlpjs/core");

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

async function compute(nlp, msg, options = {}) {
  let name = process.env.name || "Simply-Chatbot",
    bplace = process.env.birthplace || "Discord",
    age = process.env.age || "1",
    dev = process.env.developer || "Rahuletto",
    bday = process.envs.bday || "31 February 2021",
    gender = process.env.gender || "Male",
    year = process.env.year || "2021";

  msg = normalizer.normalize(msg);

  reply = await nlp.process(removeEmojis(msg));

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
let input = "Hello !";
train(manager).then(async (nlp) => {
  compute(nlp, input);
});
