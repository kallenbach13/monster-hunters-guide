import { useEffect } from 'react'
import Nav from './components/Nav'
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
            <Switch>
              <Route path="/monster/:id" component={MonsterDetail} />
              <Route exact path="/:monsterOffset?" component={MonsterList} />
            </Switch>
          </div>
          
        </div>
      </Router>
    </Elements>
  )
}

export default App