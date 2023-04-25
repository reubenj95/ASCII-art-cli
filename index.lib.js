const fs = require('node:fs/promises')
const prompt = require('prompt')

// Get choices based on files in directory
function getChoices() {
  return fs.readdir('./data')
}
// Display choices in terminal
function formatChoices() {
  return getChoices().then((choices) => {
    let formattedChoices = choices.map((choice, index) => {
      return index + 1 + ' ' + choice.substring(0, choice.length - 4)
    })
    return formattedChoices
  })
}
// Prompt user for their choice

function promptUser(userPrompt) {
  prompt.message = ''
  prompt.delimiter = ': '
  prompt.start()

  const choice = {
    name: 'choice',
    hidden: false,
    message: userPrompt,
  }
  return prompt
    .get(choice)
    .then((data) => {
      return validateChoice(data)
    })
    .catch((err) => console.error(err))
}

// Handle invalid choices
function validateChoice(userInput) {
  let regexp
  let choice = userInput.choice
  let validArt = getChoices()
  let validResult
  return validArt
    .then((result) => {
      validResult = result
      regexp = new RegExp(`[qcvdhQCVDH1-${result.length}]`)
      return regexp.test(choice)
    })
    .then((res) => {
      if (!res) {
        return 'Sorry, not sure what to do with that. Maybe try again?'
      } else if (res && isNaN(choice) === false) {
        return displayArt(validResult[+choice - 1])
      } else if (choice === 'h') {
        return "------------------------------------------------\n| Here's all the commands you could ever need. |\n| c   ----   Leave a comment                   |\n| v   ----   View all comments                 |\n| d   ----   Delete all comments               |\n| q   ----   Quit                              |\n------------------------------------------------\nMake a selection"
      } else if (choice === 'c') {
        return makeComment()
      } else if (choice === 'v') {
        return readComments()
      } else if (choice === 'd') {
        return deleteComments()
      } else if (choice === 'q') {
        console.log('Bye!')
        process.exit()
      }
    })
    .catch(() => {
      return "Sorry, that didn't work! Please make a different selection."
    })
}

// Handle valid choice and display art
function displayArt(selectedArt) {
  return fs.readFile(`./data/${selectedArt}`, 'utf8')
}

function deleteComments() {
  prompt.message = ''
  prompt.delimiter = ': '
  prompt.start()

  const option = {
    name: 'option',
    hidden: false,
    message:
      'Are you sure you want to delete all comments? This action cannot be undone. (Y/N)',
  }
  return prompt
    .get(option)
    .then((data) => {
      if (
        data.option.toLowerCase() === 'y' ||
        data.option.toLowerCase() === 'yes'
      ) {
        fs.writeFile('./comments.txt', 'Comments:')
        return 'All comments deleted'
      } else {
        return 'undefined'
      }
    })
    .catch((err) => console.error(err))
}

function readComments() {
  const comment = fs.readFile('./comments.txt', 'utf8')
  return comment
    .then((data) => {
      return `--------------------------------\n${data}\n--------------------------------`
    })
    .catch((err) => console.log(err))
}

function makeComment() {
  prompt.message = ''
  prompt.delimiter = ': '
  prompt.start()

  const comment = {
    name: 'comment',
    hidden: false,
    message: 'Enter your comment',
  }
  return prompt
    .get(comment)
    .then((data) => {
      writeComment(data)
    })
    .then(() => {
      return 'Your comment has been added!'
    })
    .catch((err) => console.error(err))
}

function writeComment(input) {
  return fs.appendFile('./comments.txt', '\n' + input.comment).catch((err) => {
    console.log("Hmmm, that didn't work. Try again if you like?")
  })
}

module.exports = {
  getChoices,
  formatChoices,
  promptUser,
  validateChoice,
  displayArt,
}
