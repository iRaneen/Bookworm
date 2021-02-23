
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from './components/NavBar';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';
import Signup from './components/Signup';
import Searching from './components/Searching';
import 'semantic-ui-css/semantic.min.css';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import About from './components/About';
import ShowOneBook from './components/ShowOneBook';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfile from './components/EditProfile';
import API_URL from './API_config';
import EditReview from './components/EditReview';

function App() {
  const history = useHistory();
  const [dataLoading, setDataloading] = useState(false)
  const [auth,setAuth]=useState({currentUser:null, isLoggedIn:false});
  const [recommendations,setRecommendations]=useState([]);
  

  const updateAuth= (user) => {
    setAuth( { currentUser: user,isLoggedIn:true } );
  }


  const userLogin = () => {
    if (localStorage.jwtToken) {
      
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "overcooked").user;
      // to make sure the have the movies or not 
    //   if (!localStorage[currentUser._id]) localStorage.setItem(currentUser._id ,JSON.stringify(currentUser.favoriteMovies))
      setAuth({ currentUser, isLoggedIn: true });
      // console.log( JSON.parse(localStorage[currentUser._id]))
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
  };
  useEffect(() => {
    
    axios.get(`${API_URL}/api/book/recommendations`)
            .then(res=>{
                    setRecommendations(res.data.recommendations)
                    setDataloading(true)
            }).catch(err=>console.log(err))
    userLogin()
  },[]);



  return (
    (dataLoading &&
    <Router>
      <NavBar loginCallback={userLogin} isLoggedIn={auth.isLoggedIn} />
      <Switch>
      <Route exact path='/books/:id'>
      {auth.isLoggedIn?<ShowOneBook auth={auth} loginCallback={userLogin} updateAuthCallBack={updateAuth}/>:
       <Redirect to="/login" message={"You need to login"} />}
        </Route>

        <Route exact path='/editReview' component={EditReview}>
        </Route>

        <Route exact path="/">
          {auth.isLoggedIn?
           <Home auth={auth} loginCallback={userLogin} setAuthCallBack={setAuth} updateAuthCallBack={updateAuth}/>
          :<LandingPage />}
        </Route>

        <Route exact path="/home">
        {auth.isLoggedIn?
          <Home auth={auth} loginCallback={userLogin} setAuthCallBack={setAuth} updateAuthCallBack={updateAuth}/>
          : <Redirect to="/" />}

        </Route>

        <Route exact path='/signup'>
          <Signup loginCallback={userLogin}/>
        </Route>

        <Route exact path='/login'>
          <Login loginCallback={userLogin}/>
        </Route>

        <Route exact path='/profile'>
        {auth.isLoggedIn?<Profile auth={auth} loginCallback={userLogin} setAuthCallBack={setAuth} updateAuthCallBack={updateAuth}/>
        :
        <Redirect to="/login" />}
        </Route>
        
        <Route exact path='/recommendations'>
          <Recommendations recommendations={recommendations} loginCallback={userLogin} auth={auth} updateAuthCallBack={updateAuth}/>
        </Route>
        
        <Route exact path='/search'>
          <Searching loginCallback={userLogin} recommendations={recommendations} auth={auth} updateAuthCallBack={updateAuth}/>
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/editprofile'>
          <EditProfile auth={auth} updateAuthCallBack={updateAuth}/>
        </Route>

        <Route path="*">
          <NotFound/>
        </Route>

     

      </Switch>
      {/* <Footer /> */}
    </Router>)

  );
}
export default App;

