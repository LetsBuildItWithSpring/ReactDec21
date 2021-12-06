
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useData, useDataPro } from './../../hook'
import Tick from '../../widgets/tick';

const myUseSelector = (abc) => {
    if(typeof abc === 'function'){
        const gloablObj = {
            movies: [],
            directors: [{name: 'abc', age: 5}],
            artists: [{name: 'xyz', age: 190}],
        };
       const pieceOfData =  abc(gloablObj);
       return pieceOfData;
    }else{
        console.error("Send function")
    }
}



const Home = (props) => {
    const dispatch = useDispatch();
   

    // const tweetsData = useSelector((state) => state.tweets);
    // const cats = useSelector(state => state.categories);

    // const tweetsData = useData('tweets');    
    // const cats = useData('categories');   
    const {tweets: tweetsData, categories: cats} =  useDataPro(['tweets', 'categories', 'balance']);

    // const tweetsData = data.tweets;
    // const cats = data.categories;
    console.log("useDataPro", );
    const [tweets, setTweets] = useState([]);
    // const [cats = [],] = useState();
    const [tickedCats, setTickedCats] = useState([]);
    console.log({ tweets })
    
    useEffect(() => {
        setTweets(tweetsData);
    }, [tweetsData])

    useEffect(() => {
        console.log("-> only for ticked cats");
    }, [tickedCats,]);
    
    useEffect(() => {
        console.log("-> only for cats");
    }, [cats,]);

    useEffect(() => {
        console.log("-> only for props and tweets");
    }, [props, tweets]);

    useEffect(() => {
        const currentTweets = tweetsData;
        if(tickedCats.length === 0){
            setTweets(currentTweets);
        } else {
            const choosenTweets = currentTweets.filter((tweet) => {
                const { category } = tweet;
                if(tickedCats.includes(category)){
                    return true
                } else{
                    return false;
                }
            });
            setTweets(choosenTweets);
        }
    }, [tickedCats])

    const getRemoveButton = (id) => {
        return <button onClick={() => {
            const action = {
                type: 'REMOVE_TWEET',
                data: id,
            };
            dispatch(action);
        }}>X</button>
    }
    const handleTickClick = (cat) => {
        if(tickedCats.includes(cat)){
            const newArray = tickedCats.filter(el => el!=cat);
            setTickedCats(newArray);
        }else{
            setTickedCats([...tickedCats, cat]);
        }
    }
    return <main id="home">
        <h1>Home</h1>
        {cats.map((cat, index) => <Tick 
                            isActive={tickedCats.includes(cat)}
                            onTick={() => handleTickClick(cat)}
                            key={index}
                            data={cat}
                    />)}
        <br />
        {
            
                <ul>
                    {tweets.map((tweet, index) => <li key={index}> 
                    {tweet.description}
                        <br/>
                            { tweet.images.map((img, index) => <img width="80" key={index} src={img}/>) }
                        <br/>
                    
                    {getRemoveButton(tweet.id)}
                    </li>)}
                </ul>
        }
    </main>
}

export default Home;