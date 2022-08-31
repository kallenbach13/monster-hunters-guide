import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectMonsterById, selectFetchAllMonstersStatus } from '../../features/monsters/monstersSlice'
import { selectCart, addMonsterToCart, changeMonsterQuantity, monsterAddedMsgUpdated, showMonsterAddedMsgUpdated } from '../../features/cart/cartSlice'

const MonsterDetail = () => {
 
  let { id } = useParams()
  const dispatch = useDispatch()
  const monster = useSelector(state => selectMonsterById(state, id))
  const cartContents = useSelector(selectCart)   
  const monstersStatus = useSelector(selectFetchAllMonstersStatus)

  //Return true if monster is already in cart
  const isMonsterInCart = () => cartContents.hasOwnProperty(monster.id)

  const handleAddToCartClick = async () => {
    try {
        if (isMonsterInCart()) {
            dispatch(changeMonsterQuantity({
                monster_id: monster.id,
                quantity: (cartContents[monster.id].quantity + 1 >= 10) ? 10 : cartContents[monster.id].quantity + 1
            }))
        } else {
        dispatch(
            addMonsterToCart({
                monster_id: monster.id,
                quantity: 1
            })
        )}
        dispatch(monsterAddedMsgUpdated(`Added ${monster.name} to Cart`))
        dispatch(showMonsterAddedMsgUpdated(true))
    } catch (err) {
        console.error('Failed to add to cart: ', err)
    }
}

  return (
      <div className="flex-grow p-5">
        { monstersStatus === 'succeeded' &&
        <div className="p-10">  
            <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg">
            <img className="w-full" src={monster.image_url_two} alt={monster.name} />
            <div className="px-6 py-4">
                <div className="font-bold font-serif text-gray-500 text-xl text-center mb-2">{monster.name}</div>
                <p className="text-gray-700 font-serif text-base text-center">
                    {monster.description}
                </p>
            </div>
            <span className="flex flex-row justify-center px-3 py-1 text-sm font-serif font-semibold text-gray-700 mx-4 mb-2">£{monster.danger_level}</span>
            <div className="px-6 pt-4 pb-2 text-center">
                <button className="inline-block bg-pink-300 rounded-full px-3 py-1 text-sm font-serif font-semibold text-white mx-4 mb-2 hover:bg-pink-400 active:bg-pink-300 focus:outline-none"
                        onClick={handleAddToCartClick}>Add to cart</button>
            </div>
            </div>
        </div>
        }
      </div>
    )
  }
  
  export default MonsterDetail