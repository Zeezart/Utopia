import './App.css'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useAuth } from './ContextApi/UserAuthContext'
import HomePage from "./Pages/Home"
import Search from './Pages/Search'
import Notification from './Pages/Notification'
import Create from './Pages/Create'
import Profile from './Pages/Profile'

function App() {

  const {currentUser} = useAuth()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/home" element={currentUser ?<HomePage /> : <SignIn />} />
        <Route path="/search" element={currentUser ? <Search /> : <SignIn />} />
        <Route path="/notification" element={currentUser ? <Notification /> : <SignIn />} />
        <Route path="/create" element={currentUser ? <Create /> : <SignIn />} />
        <Route path="/:username" element={currentUser ? <Profile /> : <SignIn />} />
        
      </Routes>
    </Router>
  )
}

export default App
