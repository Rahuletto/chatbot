<p align="center"><img align="center" style="width: 60%" src="https://user-images.githubusercontent.com/71836991/185550469-3b5117a9-a206-40b0-8744-b4d5cfaf92ac.png"></p>

<h2 style="font-size:2.5rem;" align="center"><a href="https://github.com/simply-develop/chatbot">Chatbot</a></h2>

<h3 align="center">A Friendly human-like chatbot to be with you, forever</h3>

<h2 align="center">Made by <a href="https://discord.gg/3JzDV9T5Fn">Rahuletto#0243</a></h2>
<p align="center">This template powers our system at <a href="https://simplyapi.js.org">Simply API</a></p>



-------------

# Instructions

(This is a much complex system to work with !)
[This branch is for javascript. Go to [typescript branch](https://github.com/Rahuletto/chatbot/tree/typescript) if you need the typescript project]

- Provide your chatbot's details in the `.env.example` file
- Change the input as you like in `index.js`
- Run the project and you are ready to go

## Make it yours

- Train your AI in the `corpus.json` file
- Run javascript/dynamic response using `pipelines.md` for specific intent (type)
- DO NOT edit the `conf.json` file !!
- Use the response anywhere ! You can make an API or use in your application

------------

# Warning

### This is an CPU intensive task !!

- NLP (Natural Language Processing) is an CPU and RAM intensive system.
- Training the ML model is the most computationally intensive task
- DO NOT run this project on a potato !

-----------

# How to train the AI ?

```
It is your job to train the AI. The more you train, the more smarter it gets.
```

You can train the ai in two ways

- ### The easy one

Using the nlpjs module, you can train the system with functions

You can get the manager from the `train(nlp)` function in `index.js`

```js
// ------------------------------------
// These should be in a async function !
// ------------------------------------

// Training the input-type relation (user.testing is the type here)
manager.addDocument(
    'en',
    'im testing you',
    'user.testing'
  ); 

// Response for the type of the input (user.testing is the type here)
manager.addAnswer( 
     'en', 
     'user.testing', 
     'I hope to pass the tests. Feel free to test me often' 
   );

await manager.train();
```

- ### The hard one

You can directly edit the `corpus.json` to train it. (Prone to more errors)

**Template**
```json
{
  "intent": "user.testing", // Initializing the type
  "utterances": [ // Training the input-type relation (user.testing is the type here)
    "im testing you",
    "thats a test"
  ],
  "answers": [ // Array of Response for the type of the input (user.testing is the type here)
    "I hope to pass your tests. Feel free to test me often",
    "Test me often.",
  ]
}
```

- ### Extras

You need to send a dynamic URL for a specific type of input. But how ?

Its via using `pipelines.md` !

**Template**

### First,
you need to train the input-type relation in `corpus.json`

```json
{
  "intent": "doubt.qna",
  "utterances": [
    "What is wikipedia",
    "What is Ferrari",
    "What is an atom",
    "What is curtain",
    "What is github"
  ]
}
```
where
- the `doubt.qna` is the type of input
- the `utterances` are the inputs to define its type


### Second,
you need to dynamically respond via `pipelines.md`

```md
# onIntent(doubt.qna)
// compiler=javascript

{ The JS code }
```
where
- the `doubt.qna` is the type of input
- the `{ The JS code }` is your Javascript code for dynamic response
