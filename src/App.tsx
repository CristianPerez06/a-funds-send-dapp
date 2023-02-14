import React from 'react'
import './App.scss'
import Main from './components/Main'

type Component = () => JSX.Element

const App: Component = () => {
  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App
