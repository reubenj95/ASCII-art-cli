const {
  getChoices,
  formatChoices,
  validateChoice,
  displayArt,
} = require('./index.lib.js')
const fs = require('node:fs/promises')

describe('Get choices', () => {
  it('should return an array containing the available art choices in /data', () => {
    return getChoices().then((actual) => {
      expect(actual).toEqual([
        'kea.txt',
        'kiwi.txt',
        'manaia.txt',
        'nikau.txt',
        'pohutukawa.txt',
      ])
    })
  })
})

describe('Format choices', () => {
  it('should return an array containing the formatted list of available artwork', () => {
    return formatChoices().then((actual) => {
      expect(actual).toEqual([
        '1 kea',
        '2 kiwi',
        '3 manaia',
        '4 nikau',
        '5 pohutukawa',
      ])
    })
  })
})

describe('Validate choice', () => {
  it('should return true if the user input is a valid art choice.', () => {
    return validateChoice({ choice: 1 }).then((result) =>
      expect(result).toBe(true)
    )
  })
  it.todo(
    'should return true if the user input is a valid art choice when there are more than 9 art items.'
  )
  it('should return false if the user input is not a valid art choice', () => {
    return validateChoice({ choice: 8 }).then((result) =>
      expect(result).toBe(false)
    )
  })
  it('Should return true if the input is q to quit the application', () => {
    return validateChoice({ choice: 'q' }).then((result) =>
      expect(result).toBe(true)
    )
  })
})

describe('Display art', () => {
  it('should display the artwork in the terminal', () => {
    const expected = fs.readFile('./data/kea.txt', 'utf8')
    return expected.then((expRes) => {
      return displayArt('kea.txt').then((actlRes) => {
        console.log(expRes, actlRes)
        expect(actlRes).toEqual(expRes)
      })
    })
  })
})
