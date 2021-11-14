import './App.css';
import DataCard from './components/DataCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExtractModelInfos from './system/MLextractInfos';

function App() {
    const [data, setData] = useState(null);
    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });
    const unTrainedPosts = '/training/getAllUntrainedPosts';
    //const allPosts = '/yumyum/medias';

    useEffect(() => {
        // Get only untrained user posts datas
        axInstance
            .get(`${unTrainedPosts}/boB43xVgLGYKp27NSw3n5vUczei1`)
            .then((d) => {
                let postsData = d.data.posts;
                setData(postsData);
                console.log(d.data);
                ExtractModelInfos(d.data.model, 20);
            });
    }, []);

    return (
        <Container className="App">
            {data != null &&
                data.map((dt, i) => (
                    <DataCard postId={dt._id} text={dt.caption} key={i} />
                ))}
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
`;
