import './App.css';
import DataCard from './components/DataCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExtractModelInfos from './system/MLextractInfos';
import TagList from './components/TagList';

function App() {
    const [posts, setPosts] = useState([]);
    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });
    const [wordsScore, setWordsScore] = useState([]);
    const [maxScore, setMaxScore] = useState(0);
    const [model, setModel] = useState({});
    const [deletedTexts, setDeletedTexts] = useState([]);
    const [parasiteWords, setParasiteWords] = useState([]);

    const unTrainedPostsPath = '/training/isRecipe/getAllUntrainedPosts';
    const predictionPath = '/training/isRecipe';
    const parasiteWordsPath = '/training/isRecipe/getAllParasiteWords';

    useEffect(() => {
        axInstance
            .get(`${unTrainedPostsPath}/boB43xVgLGYKp27NSw3n5vUczei1`)
            .then((res) => {
                // XX - Get posts data & Update local states
                setPosts(res.data.posts);
                setModel(res.data.model);
            });

        axInstance
            .get(`${parasiteWordsPath}`)
            .then((res) => setParasiteWords(res.data));
    }, [deletedTexts]);

    // When res has been received
    useEffect(() => {
        if (posts.length > 0) console.log('Posts', posts);
        //if (maxScore) console.log('Max score =', maxScore);
    }, [posts, deletedTexts]);

    useEffect(() => {
        if (model?.vocabulary != undefined) {
            console.log('Model', model);
            setWordsScore(ExtractModelInfos(model));
        }
        //if (maxScore) console.log('Max score =', maxScore);
    }, [model, deletedTexts]);

    useEffect(() => {
        if (wordsScore?.length > 0) {
            console.log('WordsScore = ', wordsScore);
            setMaxScore(wordsScore[0]?.score);
        }
    }, [wordsScore, deletedTexts]);

    return (
        <Container className="app">
            <TagList
                className={'top-words'}
                wordsScore={wordsScore}
                maxWords={20}
            />
            <TagList
                className={'parasite-words'}
                parasiteWords={parasiteWords}
                maxWords={20}
            />
            <div className="parasite-words"></div>
            <div className="data-cards">
                {posts != null &&
                    posts.map(
                        (dt, i) => (
                            <DataCard
                                postId={dt._id}
                                text={dt.caption}
                                key={i}
                                action={setDeletedTexts}
                                deletedTxts={deletedTexts}
                                wordsScore={wordsScore}
                                maxScore={maxScore}
                            />
                        )
                        //)
                    )}
            </div>
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .tag-list {
        position: fixed;
        z-index: 1;
    }

    .top-words {
        top: 0;
    }
    .parasite-words {
        bottom: 0;
    }
    .data-cards {
        margin-top: 60px;
        //margin: 60px 0 20px 40px;
        width: 100%;
    }
`;
