const getExerciseWords = require('../helpers/getExerciseWords')
const mockUser = require('./mockUserObject')


test('imported succesfully', () => {
    console.log(mockUser)
    expect(getExerciseWords()).toBe(1)
})


