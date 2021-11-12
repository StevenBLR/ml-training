import './App.css';
import DataCard from './components/DataCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
    const [data, setData] = useState(null);
    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

    useEffect(() => {
        axInstance
            .get('/yumyum/medias/boB43xVgLGYKp27NSw3n5vUczei1')
            .then((d) => {
                setData(d.data);
                console.log(d.data);
            });
    }, []);

    return (
        <Container className="App">
            {data != null &&
                data.map((dt, i) => <DataCard text={dt.caption} key={i} />)}
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
`;
