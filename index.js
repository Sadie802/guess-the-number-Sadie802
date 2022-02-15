const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let min = 1

async function setUp(){
    console.log(`Let's play a number guessing game! You think of a number and I guess it.`)
    let whichMax = await ask(`Would you like to set your own maximum number? Type 'y' or 'n'.\n`)
    if (whichMax === 'y'){
        return userMax()
    }else if (whichMax === 'n'){
       return normalMax()
    }


async function userMax(){
    let newMax = await ask('Type any number to set the new maximum\n')
    max = Math.floor(newMax)
    return start()
}

  async function normalMax(){
    console.log(`Okay! We will play between 1 and 100 (inclusive).`)
    max = 100
    return start()
  } 
}


async function start() {
  let input = await ask("Are you ready? Did you think of a number?? Type 'y' or 'n'.\n")
  while (input !== 'y')
      input = await ask('Are you ready now?\n')
    if (input === 'y'){
    return guessing()
  }
}


async function guessing(){

  guess = Math.floor((min + max) / 2)

  let input = await ask(`Is your number ${guess}? Enter 'y' or 'n'.\n`)
   if (input === 'y'){
    console.log(`Woohoo! I guessed it. Your number was ${guess}`)
    process.exit()
  }else if (input === 'n'){
      let answer = await ask(`Is it higher or lower than ${guess}? Type 'h' for higher or 'l' for lower.\n`)
      if (answer === 'h'){
        return higher()
      }else if (answer === 'l'){
        return lower()
      }
    

function higher(){
  min = guess + 1
  guess = Math.floor((min + max) / 2)
  return guessing()
}

function lower(){
  max = guess - 1
  guess = Math.floor((max + min) / 2)
  return guessing()
}
}
}

setUp();
