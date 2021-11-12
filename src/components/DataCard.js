import React from 'react';

import styled from 'styled-components';
function DataCard(props) {
    const { text } = props;
    return (
        <Container>
            <p>{text}</p>
        </Container>
    );
}

export default DataCard;

const Container = styled.div`
    display: flex;
    margin: 20px;
`;
