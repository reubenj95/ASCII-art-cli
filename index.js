const { formatChoices, promptUser } = require('./index.lib.js')
let counter = 0
function startProgram(prompt) {
  if (counter === 0) {
    console.log('|------------------------------|')
    console.log('| ~~~ Welcome to ASCII Art ~~~ |')
    console.log('|______________________________|')
    counter++
  }

  formatChoices()
    .then((data) => {
      console.log('Options:')
      data.forEach((item) => {
        console.log(item)
      })
    })
    .then(() => {
      console.log('Press q to exit, or h for more commands.')
      return promptUser(prompt)
    })
    .then((selection) => {
      if (selection !== 'undefined') {
        console.log(selection)
      }
      return startProgram('Make another selection')
    })
    .catch((err) => console.error(err))
}

startProgram('Please make a selection')
