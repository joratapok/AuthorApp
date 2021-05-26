import React from 'react'
import {Provider} from "react-redux";
import {BrowserRouter, } from "react-router-dom";
import App from './App';
import store from "./redux/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AppContainer: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ScrollToTop />
                <App/>
            </Provider>
        </BrowserRouter>
    )
}

export default AppContainer;
