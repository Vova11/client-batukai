import React from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App tab='home' />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to lg results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
