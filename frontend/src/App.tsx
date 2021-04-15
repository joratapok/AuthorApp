import React from 'react'
import './App.css';
import Body from './components/Body'
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";


const App: React.FC = () => {


    return (
        <BrowserRouter>
            <Provider store={store}>
                <Body/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
