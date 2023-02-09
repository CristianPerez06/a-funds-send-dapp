import React from 'react'
import './App.scss'
import Home from './components/Home'

type Component = () => JSX.Element

const App: Component = () => {
  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App
