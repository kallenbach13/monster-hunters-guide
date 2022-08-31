import { useEffect } from 'react'
import Nav from './components/Nav'
import MonsterAddedAlert from './components/cart/MonsterAddedAlert'
import Register from './components/login/Register'
import Account from './components/account/Account'
import OrderDetail from './components/account/OrderDetail'
import Cart from './components/cart/Cart'
import CheckOut from './components/checkout/CheckOut'
import CheckOutDone from './components/checkout/CheckOutDone'
import Login from './components/login/Login'
import GoogleLogin from './components/login/GoogleLogin'
import GoogleUserRegister from './components/login/GoogleUserRegister'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { selectIsLoggedIn } from './features/users/usersSlice'
import { useSelector, useDispatch } from 'react-redux'
import MonsterDetail from './components/monsters/MonsterDetail'
import MonsterList from './components/monsters/MonsterList'
import { fetchAllMonsters } from './features/monsters/monstersSlice'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const promise = loadStripe('pk_test_51I904uBSQJkm3JDXKbckPcWBdvtxBy53ZWHJPlU802XUsXyP4cLr6bwOqhvwYu5itpHPwgkBmye8MkaVFil4c4lp00IDOUmarR');

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    dispatch(fetchAllMonsters())
  }, [dispatch])

  return (
    <Elements stripe={promise}>
      <Router>
        <div className="flex bg-grey-300 flex-col min-h-screen">
          <Nav />
          <div className="mt-24 flex flex-col flex-grow">
            <MonsterAddedAlert />
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/google-login" component={GoogleLogin} />
              <Route exact path="/google-login/user-register" component={GoogleUserRegister} />
              <Route path="/register" component={Register} />
              <Route path="/account/orders/:id" component={OrderDetail} />
              <ProtectedRoute path="/account" isLoggedIn={isLoggedIn} component={Account} />
              <Route path="/monster/:id" component={MonsterDetail} />
              <Route path="/cart" component={Cart} />
              <Route exact path="/checkout">
                {isLoggedIn ? <CheckOut /> : <Redirect to="/login" />}
              </Route>
              <ProtectedRoute path="/checkout-done/:id" isLoggedIn={isLoggedIn} component={CheckOutDone} />
              <Route exact path="/:monsterOffset?" component={MonsterList} />
            </Switch>
          </div>
          
        </div>
      </Router>
    </Elements>
  )
}

export default App