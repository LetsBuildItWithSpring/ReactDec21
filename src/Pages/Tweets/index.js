
import React, { useEffect, useState } from 'react';
// import { use} from ''
import { Form, Row, Col, InputGroup, Button, FormControl, FormGroup, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import store from '../../state';
import * as fx from './../../fx';
import { readFile } from './../../utils';

const Tweets = () => {
    const [categories, setCats] = useState(store.getState().categories);
    const [tweet, setTweet] = useState({
        description: '',
        category: '',
        images: [],
    });
    const [category, setCategory] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [newFiles, setNewFiles] = useState([]);
    const { loading, failure, success } = useSelector(state => state.httpReq);
    const handleDesChange = ({ currentTarget: { value } }) => {
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
        const tempTweet = { ...tweet };
        tempTweet.category = selectedCat;
        tempTweet.images = newFiles;
        // http.createTweet(tempTweet).then((data) => {
        // const action = {
        //     type: 'ADD_TWEET',
        //     data,
        // }
        //     store.dispatch(action);
        // });
        // store.dispatch({
        //     type: 'LOADING',
        // });
        store.dispatch(fx.newTweet(tempTweet));
    }

    const createCategory = () => {
        
        store.dispatch(fx.newCategory(category));
    }
    useEffect(() => {
        store.subscribe(() => {
            const globalState = store.getState();
            console.log({ globalState })
            setCats(globalState.categories);
        });
    }, [])

    useEffect(() => {
            if(success || failure){
                setTimeout(() => {
                    store.dispatch({
                        type: 'RESET'
                    })
                }, 2500)
            }
    }, [success, failure]);

    const handleFileChange = async (event) => {
        console.log(event.currentTarget.files);
        const { currentTarget: { files } } = event;
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
        <Row>
            <Col>
                <h1>Tweets</h1>
            </Col>
        </Row>
        <Row>
            <Col lg="6">

                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Write something</InputGroup.Text>
                        <Form.Control as="textarea" value={tweet.description} onChange={handleDesChange} cols="50" rows="5" />
                    </InputGroup>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select onChange={({ currentTarget: { value } }) => setSelectedCat(value)}>
                            {categories.map((item, ind) => <option key={ind} value={item.name}>{item.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Add images</Form.Label>

                        <Form.Control multiple type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button varaint="secondary" onClick={createTweet}>Tweet</Button>
                    </Form.Group>

                </Form>
            </Col>
            <Col>
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Create Category</InputGroup.Text>
                        <FormControl onChange={({ currentTarget: { value } }) => setCategory(value)} value={category} />
                    </InputGroup>
                    <FormGroup>
                        <Button variant="primary" onClick={createCategory}>Create</Button>

                    </FormGroup>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col md="6" sm="12" lg="8">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta explicabo, mollitia assumenda accusamus maxime nemo dolore odit recusandae praesentium unde dicta consequuntur quisquam? A tempora at consequatur nobis aperiam quaerat.
                </p>
            </Col>
            <Col md="6" sm="12" lg="4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta explicabo, mollitia assumenda accusamus maxime nemo dolore odit recusandae praesentium unde dicta consequuntur quisquam? A tempora at consequatur nobis aperiam quaerat.
                </p>
            </Col>
        </Row>
        {
            loading && <Alert key={123} variant="secondary">
                Creating tweet. Please wait.
                
                like.
            </Alert>
        }
        {
            success && <Alert key={123} variant="success">
                Creating tweet. Is done.
                
                like.
            </Alert>
        }
        {
            failure && <Alert key={123} variant="danger">
                Creating tweet. Failed. Try again
                
                like.
            </Alert>
        }
    </main>
}

export default Tweets;

