import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import DashBoard from './components/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LandingPage /> */}
      <DashBoard />
    </>
  )
}

export default App
