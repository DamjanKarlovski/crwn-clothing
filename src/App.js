import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import CheckoutPage from './pages/checkout/Checkout';

import SignInSignUpPage from './pages/sign-in-and-sign-up/SignInSignUpPage'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser} from './redux/user/user.actions'
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component{


unsubscribeFromAuth = null

componentDidMount() {
  const { setCurrentUser } = this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
       setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
       
      
    }
    else {
      setCurrentUser(userAuth)
      
    }
   
  })
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}
render() { 
  return (
    <div >
      <Header/>
      <Switch>
     <Route exact path='/' component={HomePage} />
     <Route path='/shop' component={ShopPage} />
     <Route exact path='/checkout' component={CheckoutPage} />
     {/*If the user is signed in then redirect to the root(HOME PAGE), otherwise stay on SIGN IN SIGN UP PAGE ----> */}
     <Route exact path='/signin' render={() => this.props.currentUser  ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)} />
     </Switch>
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
