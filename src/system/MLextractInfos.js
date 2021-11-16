// Return current model top words (filtered)
// model = ML model
// nb = nb to words to return
export default function ExtractModelInfos(model, nb) {
    let vocab = model.vocabulary;
    let recipeFlag = model.data.recipe;
    let notRecipeFlag = model.data.notRecipe;
    let scoredVocab = [{ word: '', score: 0 }];
    let maxScore = 0;
    for (let i = 0; i < vocab.length; i++) {
        // 1 - Get current word score
        let recipScore = recipeFlag[`${i}`];
        let notRecipeScore = notRecipeFlag[`${i}`];
        let currentScore;
        // 2 - Compute score
        if (recipScore && notRecipeScore)
            currentScore = recipScore - notRecipeScore;
        else if (recipScore && !notRecipeScore) currentScore = recipScore;
        // 3 - Get max score & store current word
        if (maxScore < currentScore) maxScore = currentScore;
        scoredVocab.push({ word: vocab[i], score: currentScore });
    }
    return GetTopWords(scoredVocab, maxScore, nb);
}

// Return the top matching word for model
// data = [{word,score}]
// maxScore = maxScore
// nb = nb top elements to return
function GetTopWords(data, maxScore, nb) {
    let topWords = [];
    // 1 - Loop over data starting with maxScore
    for (let i = maxScore; i > 0; i--) {
        let currentWords = [];
        // 2 - Get all current score words to top Words
        currentWords.push(...data.slice().filter((dt) => dt.score === i));

        // 3 - Add words to topWords if were below limit
        currentWords.forEach((cw) => {
            if (topWords.length < nb && !parasiteWords.includes(cw.word))
                topWords.push(cw);
        });
    }
    return topWords;
    console.log('Top words', topWords);
}

const parasiteWords = [
    ':',
    'are',
    'our',
    'not',
    'if',
    'i',
    'el',
    'it',
    'en',
    'on',
    'y',
    'de',
    'in',
    'this',
    'la',
    'que',
    'is',
    'you',
    'by',
    'or',
    'of',
    'with',
    'to',
    'a',
    'the',
    'for',
    'pour',
    'que',
    'par',
    'les',
    'est',
    'and',
    'all',
    'sin',
    'sans',
    'lot',
    'look',
    'con',
    'por',
    'ser',
    'des',
    'per',
];
