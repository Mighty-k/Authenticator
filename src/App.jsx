
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "./Register"
import Login from './Login'

const App = () => {


  return (
  
      <Router>
          <div className="container ">
        <Routes>
          <Route exact path='/' element ={<Register/>}/>
          <Route exact path="/Register" element ={<Register/>}/>
          <Route exact path="/Login" element ={<Login/>}/>
        </Routes>
        </div>
      </Router>
    
  )
}

export default App
