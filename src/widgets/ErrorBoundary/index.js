import React, {Component} from 'react';


export default class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasErrorOccured: false,
        };
    }
    static getDerivedStateFromError(error){
        console.log('***Error has occurred->');
        return {
            hasErrorOccured: true
        }
    }
    componentDidCatch(error, eInfo){
        console.log('***Error has occurred', error,)
        console.log('***ErrorI has occurred', eInfo,)
        // this.setState({hasErrorOccured: true});
    }
    //FALLBACK UI
    render(){
        return <>
            { this.state.hasErrorOccured ? <div>
                <h3>Sorry :(</h3>
                <p>We are facing some issues. </p>
            </div> : this.props.children
            }
        </>
    }
}

