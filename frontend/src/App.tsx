import React from 'react'
import './App.css';
import Body from './components/Body'
import {Provider} from "react-redux";
import store from "./redux/store";


const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Body/>
        </Provider>
    );
}

export default App;
