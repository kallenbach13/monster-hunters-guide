import { useSelector } from 'react-redux'
import { selectCart } from '../../features/cart/cartSlice'
import { selectAllMonsters } from '../../features/monsters/monstersSlice'
import CheckoutMonster from './CheckoutMonster'

const CheckoutMonsterList = () => {

    const cartContents = useSelector(selectCart)
    const monsters = useSelector(selectAllMonsters)
  
    const totalDanger = Object.keys(cartContents).reduce((acc, keyName) => 
      acc + parseFloat(monsters[keyName].danger_level) * parseInt(cartContents[keyName].quantity, 10), 0)
  

    return (
            <div>
                <div className="grid justify-center">
                
                {Object.keys(cartContents).map(keyName =>
                        <CheckoutMonster  key={keyName}
                                    cartItem={monsters[keyName]}
                                    quantity={cartContents[keyName].quantity}/>
                                    )}
                </div>
                { (totalDanger > 0) &&
                <div className="mt-4">
                    <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                    Total danger: ${totalDanger}
                    </p>
                </div>
                }
            </div>
      )
    }
    
export default CheckoutMonsterList