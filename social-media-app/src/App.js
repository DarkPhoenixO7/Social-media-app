
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/auth';
import Home from './pages/home';
import ProfilePage from './pages/profile';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
      <div className='blur'style={{top:'-18%', right:'0'}}></div>
      <div className='blur' style={{top:'36%', left:'-8rem'}}></div>
       <Routes >
         <Route path='/' element ={user? <Navigate to="home"/>: <Navigate to="../auth"/>}  />
         <Route path='/home' element={user? <Home /> : <Navigate to="../auth"/>}/>
         <Route path='/auth' element={user? <Navigate to="../home"/>:<Auth />} />
         <Route path='/profile/:id' element={user? <ProfilePage />: <Navigate to='../auth'/>} />
       </Routes>
    </div>
  );
}

export default App;
