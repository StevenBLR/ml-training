import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
function TagList(props) {
    const {
        wordsScore,
        parasiteWords,
        maxWords,
        className,
        editMode,
        setIgnoreWord,
    } = props;
    const [topWord, setTopWords] = useState([]);
    const [prsWords, setPrsWords] = useState([]);

    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

    const addPsWordPath = '/training//isRecipe/addParasiteWord';

    useEffect(() => {
        if (wordsScore) {
            let topWords = [];
            wordsScore.forEach((ws) => {
                if (topWords.length < maxWords) topWords.push(ws);
            });
            setTopWords(topWords);
            if (topWords?.length > 0) console.log('Top words = ', topWords);
        }
    }, [wordsScore, maxWords]);

    useEffect(() => {
        if (parasiteWords?.length > 0) {
            setPrsWords(parasiteWords);
            console.log('Parasite words', parasiteWords);
        }
    }, [parasiteWords, maxWords]);

    useEffect(() => {
        console.log('Edit mode = ', editMode);
    }, [editMode]);

    function ClickOnTag(word) {
        console.log('triggered');
        if (editMode) {
            console.log(`Add "${word}" to parasite words`);
            axInstance
                .post(`${addPsWordPath}`, { text: word })
                .then((res) => console.log(res.data));
            setIgnoreWord(word);
        }
    }

    return (
        <Container className={`tag-list ${className}`}>
            {wordsScore &&
                topWord.map((ts, i) => (
                    <WordBox
                        className="wordbox top-word"
                        key={`${ts}_${i}`}
                        onClick={() => ClickOnTag(ts.word)}
                    >
                        <p className="wordbox__word">{`${ts.word}`}&nbsp;</p>
                        <p className="wordbox__position">{`(${ts.score})`}</p>
                    </WordBox>
                ))}
            {prsWords.map(
                (pw, i) =>
                    pw != undefined && (
                        <WordBox
                            className="wordbox parasite-word"
                            key={`${pw}_${i}`}
                        >
                            <p className="wordbox__word">{`${pw}`}&nbsp;</p>
                        </WordBox>
                    )
            )}
        </Container>
    );
}

export default TagList;

const Container = styled.div`
    display: flex;
    overflow: hidden;
    justify-content: start;
    box-sizing: border-box;
    border: solid 2px black;
    background-color: white;
    width: 100%;
    //height: 50px;
    .top-word {
        background-color: lightgreen;
        border: ${(props) => (props.editMode ? 'solid 2px black' : 'none')};
        ${(props) =>
            props.editMode ? 'border: solid 2px black' : 'border: none'};
    }
    .parasite-word {
        background-color: lightcoral;
    }
`;

const WordBox = styled.div`
    display: flex;
    align-items: center;
    margin: 3px;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    p {
        margin: 2px;
    }
    .wordbox {
        text-align: center;
        &__word {
            font-weight: bold;
            margin: unset;
        }
        &__position {
            font-size: 12px;
        }
    }
`;
