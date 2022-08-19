# onIntent(doubt.qna)
// compiler=javascript

let str = input.utterance.toLowerCase().replace('what is ', '').replace('who is ', '').replaceAll(' ', '_')

if(!str || str == "") return input.answer = "Wait what ?"

let search = str.charAt(0).toUpperCase() + str.slice(1);

let data = request.get(https://en.wikipedia.org/api/rest_v1/page/summary/${search})

if(data && data.extract) input.answer = 'According to Wikipedia, ' + data.extract.split('.')[0] else input.answer = "Sorry, i couldn't find what you asked"