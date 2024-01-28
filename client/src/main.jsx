import Home from './views/home/home.component'
import Detail from './views/detail/detail.component'
import Create from './views/create/create.component'
import Landing from './views/landing/landing.component.jsx'

import {Route, BrowserRouter} from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
//import { store } from './redux/store/index.js'
import { store } from './redux/store/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Provider store={store}>
        <>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/home/:id' component={Detail}/>
          <Route path='/create' component={Create}/>
        </>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
