import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import SignInSignUpPage from './pages/sign-in-and-sign-up/SignInSignUpPage'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component{
constructor(){
  super();
  this.state = {
    currentUser: null

  }

}

unsubscribeFromAuth = null

componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        })
        console.log("STATE", this.state);
        console.log('SNAPSHOT', snapShot.data());
        console.log('THIS IS THE CURRENT USER' ,this.state.currentUser);
      })
    }
    else {
      this.setState({currentUser: userAuth})
      console.log("The user is logged out", this.state.currentUser);
    }
   
  })
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}
render() { 
  return (
    <div >
      <Header currentUser={this.state.currentUser} />
      <Switch>
     <Route exact path='/' component={HomePage} />
     <Route path='/shop' component={ShopPage} />
     <Route path='/signin' component={SignInSignUpPage} />
     </Switch>
    </div>
  );
}
}

export default App;
