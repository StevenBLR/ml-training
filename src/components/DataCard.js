import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

function DataCard(props) {
    const { text, postId } = props;
    function trainRecipe(label) {
        const axInstance = axios.create({
            baseURL: 'http://localhost:8080',
        });
        let data = {
            label: label,
            postId: postId,
            text: text,
        };
        console.log(data);
        axInstance.post('/training/isRecipe', data);
    }
    return (
        <Container>
            <p>{text}</p>
            <ButtonsArea>
                <button onClick={() => trainRecipe('recipe')}>Recipe</button>
                <button onClick={() => trainRecipe('notRecipe')}>
                    Not recipe
                </button>
            </ButtonsArea>
        </Container>
    );
}

export default DataCard;

const Container = styled.div`
    display: flex;
    align-items: center;
    p {
        margin-right: 20px;
    }
`;

const ButtonsArea = styled.div`
    display: flex;
    flex-direction: column;
    button {
        max-height: 100px;
        margin-block: 10px;
    }
`;
