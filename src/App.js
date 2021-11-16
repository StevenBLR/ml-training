import './App.css';
import DataCard from './components/DataCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExtractModelInfos from './system/MLextractInfos';

function App() {
    const [posts, setPosts] = useState([]);
    const axInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });
    const axInstance2 = axios.create({
        baseURL: 'http://localhost:8080',
    });
    const [topWords, setTopWords] = useState([]);
    let [deletedTexts, setDeletedTexts] = useState([]);

    const unTrainedPostsPath = '/training/getAllUntrainedPosts';
    const predictionPath = '/training/isRecipe';

    useEffect(() => {
        let postsData = [];
        // 1 - Get only untrained user posts datas
        axInstance
            .get(`${unTrainedPostsPath}/boB43xVgLGYKp27NSw3n5vUczei1`)
            .then((d) => {
                // 2 - Get posts data
                postsData = d.data.posts;
                axInstance2
                    .get('/training/isRecipe', {
                        text: postsData[0].caption,
                    })
                    .then((data) => {
                        //console.log('Returned data = ', data);
                        //post.score = data;
                        //console.log('Post data ', post);
                        console.log('Data ', data);
                    });
                //});

                setPosts(postsData);
                // setPosts(postsData);
                // console.log(d.data);
                // setTopWords(ExtractModelInfos(d.data.model, 20));
            });

        // 3 - Add score to post data
        //posts.forEach((post) => {
        //console.log(post);
        // axInstance
        //     .get(`/training/isRecipe/`, {
        //         text: posts[0].caption,
        //     })
        //     .then((data) => {
        //         //console.log('Returned data = ', data);
        //         //post.score = data;
        //         //console.log('Post data ', post);
        //         console.log('Data ', data);
        //     });
        //});

        console.log('Deleted Text', deletedTexts);
    }, [deletedTexts]);

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
        <Container className="App">
            {posts != null &&
                posts.map(
                    (dt, i) => (
                        //!deletedTexts.includes(dt._id) && (
                        <DataCard
                            postId={dt._id}
                            text={dt.caption}
                            key={i}
                            action={setDeletedTexts}
                            deletedTxts={deletedTexts}
                            topWords={topWords}
                            //score={getPostScore(dt.caption)}
                        />
                    )
                    //)
                )}
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
`;
