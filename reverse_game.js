// Boilder plate for Promise
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// ------^------^------^-------^------//

async function reverseGameStart (){
    let instructions = await ask(`Welcome to the number guessing game!!!\nDo you want to read the instructions on how to play? Type "y" or "n".\n`)
    //instructions for game play
    if (instructions === 'y'){
        console.log(` 1) I will think of a number and you will try to guess it!\n 2) I will ask you to set the maximum number\n 3) We will play with the minimum (0) and maximum inclusive\n 4) You will enter your guess, and I will tell you if your guess is correct, too high, or too low.\n`)
        let ready = await ask('So are you ready to play? Type "y" or "n"\n')
            while (ready === 'n'){
                ready = await ask('.........are you ready now?\n') 
            }
            if (ready === 'y'){
                return playing() 
            //catching incorrect user input
            } else {
                console.log(`You need to enter "y" or "n". Let's try again`)
                return reverseGameStart()
            }
    //skipping game play instructions
    } else if (instructions === 'n'){
        console.log("Great. We'll assume you know how to play! Let's get to it!")
        return playing()
    //catching incorrect user input
    }else {
        console.log(`I don't know what "${instructions}" means. Let's start over.`)
        return reverseGameStart()
    }

    async function playing (){
        //Letting user assign maximum number
        let max = await ask("Here we go!! Let's start with the maximum number. Type the number you would like the maximum to be: ")
        console.log(`Great. ${max} is the maximum number we will play with.\n Now I will think of a number between 0 and ${max}`)
        //generating random number between 0-1, multiplying by user set max number, adding 1 so secret number inclusive of user set max, rounding number down to nearest integer.
        let secretNumber = Math.floor(Math.random() * max + 1) 
        console.log("Still thinking.......\n ..... \n ...... \n ....... \n Okay! I got it.")
        return guessingReverse()

        async function guessingReverse(){
            //assigning user's guess to variable
            let userGuess = await ask('Guess my number: \n')
            //checking if user guess is same as secret number
            if (userGuess == secretNumber){
                console.log(`Woohoo! You guessed it! My secret number was ${secretNumber}`)
                let playAgain = await ask('Would you like to play again? Type "y" or "n".\n')
                    if (playAgain === 'y'){
                        return reverseGameStart()//starting game over if user wants to play again
                    } else if (playAgain === 'n'){
                        process.exit()//exiting game if user does not want to play again
                    //catching incorrect user input - booting user out of game
                    }else {
                        console.log(`Since you didn't say "y" or "n", I'm assuming you don't want to play again.\n Bye!!`)
                        process.exit()
                    }
                }
            //checking if user guess greater than secret number
            if (userGuess > secretNumber){
                max = (userGuess - 1)//assigning new max to be one less than previous user guess
                console.log(`Too high! My number is less than your guess of ${userGuess}. Guess again -- BUT REMEMBER -- now the max number is ${max} \n`)
                return guessingReverse()//restarting guessing function
            }

            //checking if user guess lower than secret number
            if (userGuess < secretNumber){
                min = (+userGuess + +1)//assigning new max to be one higher than previous user guess
                console.log(`Too low! My number is greater than your guess of ${userGuess}. Guess again -- BUT REMEMBER -- now the minimum number ${min}`)
                return guessingReverse()//restarting guessing function
            }
        }
    }

}

reverseGameStart()