import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMonsterToCart, changeMonsterQuantity, selectCart, monsterAddedMsgUpdated, showMonsterAddedMsgUpdated } from '../../features/cart/cartSlice'

const MonsterCard = ({monster}) => {
    
    const dispatch = useDispatch()
    const cartContents = useSelector(selectCart)   

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

            <div className="m-4 bg-white max-w-xs flex flex-col overflow-hidden border rounded shadow-lg">
                <div className="flex flex-col flex-grow justify-center">
                    <Link to={`/monster/${monster.id}`}>  
                        <img className="w-full" src={monster.image_url_one} alt={monster.name} />
                    </Link>
                </div>  
                    <div className="flex flex-col justify-center h-48">
                        <Link to={`/monster/${monster.id}`}>  
                            <div className="p-2">
                                <div className="font-bold font-serif text-lg text-gray-500 text-center mb-2">{monster.name}</div>
                                <p className="text-gray-700 text-base text-center font-serif">
                                {monster.description}
                                </p>
                            </div>
                        </Link>
                        <div className="flex flex-row justify-center px-3 py-1 text-sm font-semibold font-serif text-gray-700 mr-2 mb-2">£{monster.danger_level}</div>                        
                        <div className="p-2 text-center">
                            <button   className="inline-block bg-pink-300 rounded-full px-3 py-1 text-sm font-semibold font-serif text-white mr-2 mb-2 hover:bg-pink-400 active:bg-pink-400 focus:outline-none"
                                      onClick={handleAddToCartClick}>Add to cart</button>
                        </div>
                    </div>
            </div>

    )
  }
  
  export default MonsterCard