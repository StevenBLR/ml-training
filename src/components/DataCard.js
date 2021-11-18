import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import colorLerp from 'color-lerp';

function DataCard(props) {
    const buttons = ['recipe', 'notRecipe'];
    const { text, postId, action, wordsScore, maxScore } = props;
    const [wordsSplit, setWordsSplit] = useState([]);
    const [processedTxt, setProcessedTxt] = useState([]);
    const [predictionInfos, setPredictionInfos] = useState();

    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

    function trainRecipe(label) {
        action(postId);
        const axInstance = axios.create({
            baseURL: 'http://localhost:8080',
        });
        let data = {
            label: label,
            postId: postId,
            text: text,
        };
        axInstance.post('/training/isRecipe', data);
    }

    // Return a classname depending on current word score
    function getClassNameByWordScore(word) {
        let score = wordsScore?.find((ws) => ws.word === word)?.score;
        let className = '';
        if (score) {
            //console.log('Score = ', score);
            className = `matching-txt color-index__${score}`;
        }
        return className;
    }

    function getColorByScore(score) {}

    // On first loading
    useEffect(() => {
        let splittedWords = [];
        // 1 - Store every word in text
        if (text) splittedWords.push(...text?.split(/[\s,#\.]+/gi));
        // 2 - Save it as a usedState;
        setWordsSplit(splittedWords);
        // 3 - Get model infos for text
        axInstance.get(`/training/isRecipe/${text}`).then((res) => {
            setPredictionInfos(res.data);
            console.log('Data ', res.data);
        });
        // 3 - Build text elts
        let tempTxt = [];
        tempTxt = splittedWords.map((sw) => (
            <span className={getClassNameByWordScore(sw)}>{sw}</span>
        ));
        console.log('Temps txt', tempTxt);

        setProcessedTxt(tempTxt);
    }, [text, wordsScore]);

    //const allPosts = '/yumyum/medias';
    // Return score if current word is in the top matching words
    function checkTop(wordToCheck) {
        let temp = topWords.find((data) => data.word === wordToCheck);
        if (temp) return temp.score;
    }

    return (
        <Container>
            <TextArea>
                <div className="label">
                    {predictionInfos?.label ? (
                        <span
                            className={`label__text ${
                                predictionInfos?.label != undefined &&
                                predictionInfos?.label
                            }`}
                        >{`${predictionInfos?.label} ${predictionInfos?.confidence}`}</span>
                    ) : (
                        <span className="label__text">...</span>
                    )}
                </div>

                <p className="color-index">{processedTxt}</p>
            </TextArea>
            <ButtonsArea>
                {/* 1 - Generating training bts */}
                {buttons.map((b, id) => (
                    <button
                        onClick={() => trainRecipe(b)}
                        className={b}
                        key={id}
                    >
                        {b === 'recipe' ? 'Recipe' : 'Not Recipe'}
                    </button>
                ))}
            </ButtonsArea>
        </Container>
    );
}

export default DataCard;

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    .topWord {
        font-weight: bold;
        color: green;
    }
`;

const TextArea = styled.div`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 150px;
    border: solid 2px black;
    margin-right: 20px;
    padding: 10px;
    p {
        margin: unset;
        line-height: 1.5;
        .matching-txt {
            font-weight: bold;
        }
        .color-index {
            &__1 {
            }
        }
    }
    .label {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        background-color: gray;
        min-width: 80px;
        height: 30px;
        span {
            font-weight: bold;
            margin-inline: 10px;
        }
        .recipe {
            background-color: green;
        }
    }
`;

const ButtonsArea = styled.div`
    display: flex;
    flex-direction: column;
    button {
        font-weight: bold;
        border: none;
        min-height: 75px;
        max-height: 100px;
        margin-block: 10px;
    }
    .recipe {
        background-color: lightgreen;
    }
    .notRecipe {
        background-color: lightcoral;
    }
`;
