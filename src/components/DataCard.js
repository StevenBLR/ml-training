import React from 'react';

import styled from 'styled-components';
function DataCard(props) {
    const { text } = props;
    return (
        <Container>
            <p>{text}</p>
            <ButtonsArea>
                <button>Recipe</button>
                <button>Not recipe</button>
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
