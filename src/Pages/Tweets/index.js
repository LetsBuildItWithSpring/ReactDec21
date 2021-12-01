
import React, { useEffect, useState } from 'react';
import store from '../../state';


const Tweets  = () => {
    const [categories, setCats] = useState(store.getState().categories);
    const [tweet, setTweet] = useState({
        description: '',
        category: '',
    });
    const [category, setCategory] = useState('');
    const [selectedCat, setSelectedCat] = useState('');

    const handleDesChange = ({currentTarget: {value}}) => {
        setTweet({
            ...tweet, // {description:'', category: ''},
            description: value
        })
    }
    // const handleCatChange = ({currentTarget: {value}}) => {
    //     setTweet({
    //         ...tweet, // {description:'', category: ''},
    //         category: value
    //     })
    // }
    const createTweet = () => {
        const tempTweet = { ...tweet};
        tempTweet.category = selectedCat;

        const action = {
            type: 'ADD_TWEET',
            data: tempTweet,
        }
        store.dispatch(action);
    }

    const createCategory = () => {
        const action = {
            type: 'ADD_CATEGORY',
            data: category,
        }
        store.dispatch(action);
    }
    useEffect(() => {
        store.subscribe(() => {
            const globalState = store.getState();
            console.log({globalState})
            setCats(globalState.categories);
        });
    }, [])
    return <main id="tweets">
        <h1>Tweets</h1>
        <textarea value={tweet.description} onChange={handleDesChange} cols="50" rows="5"></textarea>
        <br/>
        <select onChange={({currentTarget: {value}}) => setSelectedCat(value)}>
            {categories.map((item, ind) => <option key={ind} value={item}>{item}</option>)}
        </select>
        <br/>
        <br/>
        <button onClick={createTweet}>Tweet</button>
        <br/>
        <br/>
        <br/>
        <table>
            <tbody>
                <tr>
                    <td>
                        <input onChange={({currentTarget: {value}}) => setCategory(value)} value={category} placeholder="Create a new category"/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={createCategory}>Create</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
}

export default Tweets;