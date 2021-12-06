
import React, { useEffect, useState } from 'react';
// import { use} from ''
import store from '../../state';
import * as fx from './../../fx';
import { readFile } from './../../utils';

const Tweets  = () => {
    const [categories, setCats] = useState(store.getState().categories);
    const [tweet, setTweet] = useState({
        description: '',
        category: '',
        images: [],
    });
    const [category, setCategory] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [newFiles, setNewFiles] = useState([]);

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
        tempTweet.images = newFiles;
        // http.createTweet(tempTweet).then((data) => {
            // const action = {
            //     type: 'ADD_TWEET',
            //     data,
            // }
        //     store.dispatch(action);
        // });
        
        store.dispatch(fx.newTweet(tempTweet));
        
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

    const handleFileChange = async (event) => {
        console.log(event.currentTarget.files);
        const { currentTarget: {files} } = event; 
        // const file = files[0];
        // console.log(file);
        
        // const fReader = new FileReader();
        // fReader.readAsDataURL(file);
        // fReader.addEventListener('load', (ev) => {
        //    const { currentTarget: {result} } = ev;
        //    console.log("Result of file upload")
        //    console.log(result);
        //    setNewFile(result);
        // });
        const fileArray = Array.from(files);
        const promises$ = fileArray.map(readFile);
        const uplodedImages = await Promise.all(promises$);
        setNewFiles(uplodedImages);
    }

    return <main id="tweets">
        <h1>Tweets</h1>
        <textarea value={tweet.description} onChange={handleDesChange} cols="50" rows="5"></textarea>
        <br/>
        <select onChange={({currentTarget: {value}}) => setSelectedCat(value)}>
            {categories.map((item, ind) => <option key={ind} value={item}>{item}</option>)}
        </select>
        <br/>
        <input multiple type="file" onChange={handleFileChange} />
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