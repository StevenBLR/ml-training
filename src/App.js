import './App.css';
import DataCard from './components/DataCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExtractModelInfos from './system/MLextractInfos';
import Header from './components/Header';

function App() {
    const [posts, setPosts] = useState([]);
    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });
    const [wordsScore, setWordsScore] = useState([]);
    const [maxScore, setMaxScore] = useState(0);
    const [model, setModel] = useState({});
    const [deletedTexts, setDeletedTexts] = useState([]);

    const unTrainedPostsPath = '/training/getAllUntrainedPosts';
    const predictionPath = '/training/isRecipe';

    useEffect(() => {
        axInstance
            .get(`${unTrainedPostsPath}/boB43xVgLGYKp27NSw3n5vUczei1`)
            .then((res) => {
                console.log(res);
                // XX - Get posts data & Update local states
                setPosts(res.data.posts);
                setModel(res.data.model);
                // PK le model ne est vide ligne suivante alors qu'il est rempli juste avant
                // setWordsScore(ExtractModelInfos(d.data.model));
                // setMaxScore(wordsScore[0]?.score);
            });
    }, [deletedTexts]);

    // When res has been received
    useEffect(() => {
        if (posts.length > 0) console.log('Posts', posts);
        //if (maxScore) console.log('Max score =', maxScore);
    }, [posts]);

    useEffect(() => {
        if (model?.vocabulary != undefined) {
            console.log('Model', model);
            setWordsScore(ExtractModelInfos(model));
        }
        //if (maxScore) console.log('Max score =', maxScore);
    }, [model]);

    useEffect(() => {
        if (wordsScore) {
            console.log('WordsScore = ', wordsScore);
            setMaxScore(wordsScore[0]?.score);
        }
    }, [wordsScore]);

    // For the first run and for each modification on deletedTexts
    // useEffect(async () => {
    //     // 1 - Get only untrained user posts datas

    //     setPosts(res.data.posts);
    //     setModel(res.data.model);
    //     // axInstance
    //     //     .get(`${unTrainedPostsPath}/boB43xVgLGYKp27NSw3n5vUczei1`)
    //     //     .then((d) => {
    //     //         // 2 - Get posts data
    //     //         postsData = d.data.posts;
    //     //         // 3 - Update local states
    //     //         setPosts(postsData);
    //     //         setModel(d.data.model);
    //     //         // PK le model ne est vide ligne suivante alors qu'il est rempli juste avant
    //     //         setWordsScore(ExtractModelInfos(d.data.model));
    //     //         if (wordsScore) setMaxScore(wordsScore[0]?.score);
    //     //     });

    //     console.log('Model =', model);
    //     //console.log('Words score =', wordsScore);
    //     // 3 - Add score to post data
    //     //posts.forEach((post) => {
    //     //console.log(post);
    //     // axInstance
    //     //     .get(`/training/isRecipe/`, {
    //     //         text: posts[0].caption,
    //     //     })
    //     //     .then((data) => {
    //     //         //console.log('Returned data = ', data);
    //     //         //post.score = data;
    //     //         //console.log('Post data ', post);
    //     //         console.log('Data ', data);
    //     //     });
    //     //});
    // }, [deletedTexts]);

    // useEffect(() => {
    //     //console.log(posts);
    //     const axInstance2 = axios.create({
    //         baseURL: 'http://localhost:8080',
    //     });
    //     // 3 - Add score to post data
    //     posts.forEach((post) => {
    //         console.log(post);
    //         axInstance2
    //             .get('/training/isRecipe', {
    //                 text: post.caption,
    //             })
    //             .then((data) => {
    //                 //console.log('Returned data = ', data);
    //                 //post.score = data;
    //                 //console.log('Post data ', post);
    //                 console.log(data);
    //             });
    //     });
    // }, []);

    // function getPostScore(caption) {
    //     const axInstance2 = axios.create({
    //         baseURL: 'http://localhost:8080',
    //     });
    //     axInstance2
    //         .get('/training/isRecipe', {
    //             text: caption,
    //         })
    //         .then((data) => {
    //             console.log('Returned data = ', data);
    //             return data;
    //         });
    // }

    return (
        <Container className="app">
            <Header wordsScore={wordsScore} maxWords={20} />
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
    .data-cards {
        margin: 60px 0 20px 40px;
        width: 100%;
    }
`;
