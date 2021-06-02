import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import AppContainer from './AppContainer'

export const renderAllDOM = () => {
    ReactDOM.render(
        <AppContainer />, document.getElementById('root')
    )
}

renderAllDOM()

reportWebVitals()
