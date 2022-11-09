const createGenericArray = () => {
  let result = [];
  for (let i = 0; i < 50; i++) {
    result.push({ original: "Test", translation: "Test", type: "Test" });
  }
  return result;
};

module.exports = {
  name: "Generic User",
  notebooks: {
    Notebook100: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook101: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook102: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook103: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook104: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook105: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook106: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook107: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook108: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    },
    Notebook109: {
      wordCount: 200,
      words: {
        type1: createGenericArray(),
        type2: createGenericArray(),
        type3: createGenericArray(),
        type4: createGenericArray()
      }
    }
  }
};
