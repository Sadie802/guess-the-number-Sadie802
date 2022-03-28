// Boilder plate for Promise
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// ------^------^------^-------^------//


let min = 1; //creating minimum number 

//Initial game set up function
async function setUp() {
  console.log(
    `Let's play a number guessing game! You think of a number and I guess it.`
  );
  let whichMax = await ask(
    `Would you like to set your own maximum number? Type 'y' or 'n'.\n`
  );
  if (whichMax === "y") {
    return userMax();//returning function for user to set max input
  } else if (whichMax === "n") {
    return normalMax();//returning function that sets max input to 100
  } else {
    //if user does not type 'y' or 'n', app complains and sends user back to beginning of game
    console.log(`Follow the instructions. I don't know what "${whichMax}" means`);
    return setUp();
  }

  //Function for user setting max number:
  async function userMax() {
    let newMax = await ask("Type any number to set the new maximum\n");//storing user input to variable newMax
    max = Math.floor(newMax);//Ensuring that user input is a whole number
    return start();
  }

  //Function assigning maximum number to 100 if user does not want to set their own max.
  async function normalMax() {
    console.log(`Okay! We will play between 1 and 100 (inclusive).`);
    max = 100;
    return start();
  }
}

//Making sure user is ready to play the game and has thought of a number
async function start() {
  let input = await ask(
    "Are you ready? Did you think of a number?? Type 'y' or 'n'.\n"
  );
  if (input === "n"){
    input = await ask("Are you ready now?\n");
  } 
  //when user is ready and types 'y', calls function to get users "secret number"
  if (input === "y") {
    return secretNumber();
  } else {
    console.log(`Follow the instructions. I don't know what "${input}" means`);//If user inputs anything other than 'y' or 'n', app complains and starts function over.
    return start();
  }
}

//Asking user to type their secret number and assigning it to variable that is used for cheat detectors 
async function secretNumber() {
  let secretNumber = await ask("Type your secret number below:\n");
  return guessing();

  async function guessing() {
    guess = Math.floor((min + max) / 2);//assigning guess to be the average of min and max
    let input = await ask(`Is your number ${guess}? Enter 'y' or 'n'.\n`);

    //If computer guessed users secret number
    if (input === "y") {

      //Checking that users secret number is truly equal to computers guess
      if (secretNumber = guess){
      console.log(`Woohoo! I guessed it. Your number was ${guess}!!\n`);
      } else {

        //Cheat detecting -- if secret number not actually equal to guess then game starts over
        console.log(`Umm.. you're lying. You said your secret number was ${secretNumber} which is not equal to my guess of ${guess}. Let's start over. No cheating or lying this time!!!`)
        return setUp()
      }
      let playAgain = await ask(
        "Do you want to play again? Type 'yes' or 'no'\n"
      );
      if (playAgain === "yes") {//restarting game if user input yes
        return setUp();
      } else if (playAgain === "no") {//quitting game if user input no
        process.exit();

      //if user input neither yes or no, game quits.
      } else {
        console.log(
          "You need to type yes or no. Since you didn't follow rules, I'm making you leave.\n"
        );
        process.exit();
      }
    //------^----------^------^---------------------------------------------------------

    //If computer guess incorrect:
    } else if (input === "n") {
      let answer = await ask(
        `Is it higher or lower than ${guess}? Type 'h' for higher or 'l' for lower.\n`
      );
      if (answer === "h") {//If user says secret number higher than guess, calls cheat detector function to confirm 
        return cheatCheckHigher();
      } else if (answer === "l") {//If user says secret number lower than guess, calls cheat detector to confirm
        return cheatCheckLower();
      } else if (answer !== "h" || answer !== "l") {//if user input neither 'h' or 'l', starts guessing function over
        console.log(
          "I don't understand what you mean. Please type an actual command. Let's try again.\n"
        );
        return guessing()
      }

      //Cheat detector to confirm secret number actually higher than guess
      function cheatCheckHigher() {
        if (secretNumber < guess) {//if secret number less than guess (user cheated) and starts guessing function over
          console.log(
            `Hey.. you're cheating! You said ${secretNumber} was your secret number which is lower than my guess of ${guess}. But you just said it was higher. Let's try again..`
          );
          return guessing();
        } else if (secretNumber > guess) {//if secret number higher than guess (user not cheating), returns higher function
          return higher();
        }
      }

      //Cheat detector to confirm secret number is actually lower than guess
      function cheatCheckLower() {
        if (secretNumber > guess) {//if secret number higher than guess (user cheated), guessing function starts over
          console.log(
            `Hey.. you're cheating! You said ${secretNumber} was your secret number which is higher than my guess of ${guess}. But you just said it was lower. Let's try again..`
          );
          return guessing();
        } else if (secretNumber < guess) {//if secret number lower than guess (user not cheating), returns lower function
          return lower();
        }
      }

      //Function if secret number higher than computer guess
      function higher() {
        min = guess + 1;//changes minimum to be one higher than last guessed number
        guess = Math.floor((min + max) / 2);//assigns new guess to be average of new min and max
        return guessing();//returns guessing function with new guess value
      }

      //Function if secret number lower than computer guess
      function lower() {
        max = guess - 1;//changes maximum to be one less than last guessed number
        guess = Math.floor((max + min) / 2);//assigns guess to be average of new min and max
        return guessing();//returns guessing function with new guess value
      }
    } else {//catching inputs that are neither 'y' or 'n'
      console.log("I don't know what that means. Follow the instructions.\n");
      return guessing();
    }
  }
}

setUp();
