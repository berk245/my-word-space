const getExerciseWords = require('../helpers/getExerciseWords')

test('imported succesfully', () => {
    expect(getExerciseWords()).toBe(1)
})


