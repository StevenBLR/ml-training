import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
function Header(props) {
    const { wordsScore, maxWords } = props;
    const [topWord, setTopWords] = useState([]);

    useEffect(() => {
        let topWords = [];
        wordsScore.forEach((ws) => {
            if (topWords.length < maxWords) topWords.push(ws);
        });
        console.log('Top words = ', topWords);
        setTopWords(topWords);
    }, [wordsScore, maxWords]);

    return (
        <Container>
            {wordsScore &&
                topWord.map((ts, i) => (
                    <WordBox className="wordbox" key={`${ts}_${i}`}>
                        <p className="wordbox__position">{i + 1}:</p>
                        <p className="wordbox__word">{ts.word}</p>
                        {/* {ReactHtmlParser(`
                        <p>
                            ${i + 1}"${ts.word}"
                        </p>
                        `)} */}
                    </WordBox>
                ))}
        </Container>
    );
}

export default Header;

const Container = styled.div`
    display: flex;
    overflow: hidden;
    justify-content: start;
    box-sizing: border-box;
    top: 0;
    position: fixed;
    z-index: 1;
    border: solid 2px black;
    background-color: white;
    width: 100%;
    //height: 50px;
`;

const WordBox = styled.div`
    display: flex;
    align-items: center;
    margin: 3px;
    border-radius: 10px;
    padding: 10px;
    background-color: lightgreen;
    p {
        margin: 2px;
    }
    .wordbox {
        &__word {
            font-weight: bold;
            text-align: center;
            margin: unset;
        }
    }
`;
