import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { GetWordScore } from '../system/MLextractInfos';

function DataCard(props) {
    const buttons = ['recipe', 'notRecipe'];
    const { text, postId, action, topWords, MLmodel } = props;
    const [wordsSplit, setWordsSplit] = useState([]);
    const [processedTxt, setProcessedTxt] = useState([]);

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
    function processWordDisplaying(score) {}

    // On first loading
    useEffect(() => {
        let splittedWords = [];
        // 1 - Store every word in text
        if (text) splittedWords.push(...text?.split(/[\s,#\.]+/gi));
        // 2 - Save it as a usedState;
        //console.log('words split', splittedWords);
        setWordsSplit(splittedWords);
        // 3 - Build text elts
        let tempTxt = [];
        splittedWords.forEach((ws) => {
            // 1 - Create span elt for current word and add classname depending on its score in model
            tempTxt.push(
                `<span classnName="${processWordDisplaying(
                    GetWordScore(ws, MLmodel)
                )}">${ws} </span>`
            );
        });
        setProcessedTxt(tempTxt);
    }, [text, MLmodel]);

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
                    <span className="label__text">label</span>
                </div>

                <p>{processedTxt.map((txt) => ReactHtmlParser(txt))}</p>
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
    }
    .label {
        position: absolute;
        top: 0;
        right: 0;
        background-color: red;
        min-width: 80px;
        height: 30px;
        span {
            font-weight: bold;
            margin-inline: 10px;
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
