import React, {useEffect} from 'react'
import './App.css';
import Body from './components/Body'
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {initAppThunk} from "./redux/initAppReducer";
import Preloader from "./components/preloader/Preloader";

type MapStatePropsType = {
    initApp: boolean
}
type MapDispatchPropsType = {
    initAppThunk:  () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const App: React.FC<PropsType> = ({initApp, initAppThunk}) => {

    useEffect(() => {
        initAppThunk()
    }, [])

    if (!initApp) {
        return <Preloader/>
    }

    return (
                <Body/>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    initApp: state.auth.isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {initAppThunk, })(App)
