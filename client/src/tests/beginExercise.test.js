// import createWordPool from "../functions/beginExercise";
const mockDB = require('./mockDB')
const beginExercise = require('../functions/beginExercise')

let invalidParameter = {
    amount: '',
    notebook: '',
    type: ''
}

let specificNotebookAndType = {
    amount: 400,
    notebook: 'Notebook100',
    type: 'type1'
}

let specificNotebookAllTypes = {
    amount: 400,
    notebook: 'Notebook100',
    type: 'random'
}

let allNotebooksSpecificType = {
    amount: 600,
    notebook: 'all',
    type: 'type1'
}
let allNotebooksAllTypes= {
    amount: 11100,
    notebook: 'all',
    type: 'random'
}

test('should return false when an invalid object is passed as parameter.', () => {
    expect(beginExercise(invalidParameter, mockDB)).toBe(false)
})


test('should return false when a specific notebook has less total words then requested amount.', () => {
    expect(beginExercise(specificNotebookAndType, mockDB)).toBe(false)
})

test('should return false when a specific notebook has less words of a specific type then requested amount.', () => {
    expect(beginExercise(specificNotebookAllTypes, mockDB)).toBe(false)
})

test('should return false when a user has less total words of a specific type then requested amount.', () => {
    expect(beginExercise(allNotebooksSpecificType, mockDB)).toBe(false)
})
test('should return false when a user has less total words then requested amount.', () => {
    expect(beginExercise(allNotebooksAllTypes, mockDB)).toBe(false)
})


