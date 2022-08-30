import { Link } from 'react-router-dom'
import { selectIsLoggedIn } from '../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInUpdated, currentUserUpdated, currentUserStatusUpdated } from '../features/users/usersSlice'
import { cartProductsUpdated, selectCart } from '../features/cart/cartSlice'
import { customerOrdersUpdated } from '../features/orders/ordersSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import apiAxios from './../config/axiosConfig'

function Nav() {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    const nrCartItems = Object.keys(cart).reduce((acc, keyName) => 
    acc + cart[keyName].quantity, 0)

    const handleLogout = async() => {
      try {
        await dispatch(isLoggedInUpdated(false))
        await dispatch(currentUserUpdated({})) //Clear current user info from session
        await dispatch(cartProductsUpdated({})) //Clear cart
        await dispatch(customerOrdersUpdated({})) //Clear orders
        await dispatch(currentUserStatusUpdated('idle'))
        await apiAxios.post('/auth/logout')
      } catch(err) {
        console.log(err)
      }
    }

    return (
      <div className="bg-white fixed w-full">
        <div className="max-w-8xl mx-auto flex flex-row justify-around items-center p-2">
              <div className="m-2">
                <Link to="/">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-pink-300 text-center font-serif whitespace-nowrap mx-2">Monster Hunter's Guide</p>
                </Link>
              </div>          
        </div>
      </div>
    )
  }
  
  export default Nav