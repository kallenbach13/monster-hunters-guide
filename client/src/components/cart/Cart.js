import CartMonster from './CartMonster'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart,  needsCheckoutRedirectUpdated } from '../../features/cart/cartSlice'
import { selectAllMonsters } from '../../features/monsters/monstersSlice'
import { useHistory } from 'react-router-dom'

const Cart = () => {

  const cartContents = useSelector(selectCart)
  const monsters = useSelector(selectAllMonsters)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCheckout = () => {
    dispatch(needsCheckoutRedirectUpdated(true))
    history.push('/checkout')
  }

  const totalDanger = Object.keys(cartContents).reduce((acc, keyName) => 
    acc + parseFloat(monsters[keyName].danger_level) * parseInt(cartContents[keyName].quantity, 10), 0)

    return (
        <div className="mt-10">
          <div className="grid justify-center">
              {Object.keys(cartContents).map(keyName =>
                  <CartMonster  key={keyName}
                                cartItem={monsters[keyName]}
                                quantity={cartContents[keyName].quantity}/>
                                )}
          <div>
          { (totalDanger > 0) &&
          <div>
              <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                Total danger: ${totalDanger}
              </p>
          </div>
          }
          <div>
            { (Object.keys(cartContents).length) ?
            <div className="flex justify-center">
              <button className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium font-serif rounded-md text-white bg-pink-300 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                      onClick={handleCheckout}>
                    Go to Checkout
              </button>   
            </div>
            :
            <div>
                <p className="font-bold font-serif text-xl mb-2 text-gray-700 text-base">
                  The cart is empty.
                </p>
            </div>
            }
            </div>
            </div>     
          </div>
        </div>
      )
    }
    
export default Cart