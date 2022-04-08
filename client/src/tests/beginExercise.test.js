// import createWordPool from "../functions/beginExercise";
const mockDB = require('./mockDB')
const beginExercise = require('../functions/beginExercise')

test('imported succesfully', () => {
    expect(beginExercise('params')).toBe(1)
})



