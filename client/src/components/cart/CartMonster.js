import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeMonsterFromCart, changeMonsterQuantity } from '../../features/cart/cartSlice'

const CartMonster = ({cartItem, quantity}) => {

    const [monsterQty, setMonsterQty] = useState(quantity) 
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(changeMonsterQuantity({
                monster_id: cartItem.id,
                quantity: parseInt(monsterQty, 10)
            })
        )
    }, [monsterQty, cartItem.id, dispatch])
    
    const handleRemoveMonster = async() => {
        try {
            await dispatch(
                removeMonsterFromCart({
                    'monster_id': cartItem.id,
                })
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-row items-center">
                <div>
                    <img className="m-2 hidden sm:block max-h-24 rounded" src={cartItem.image_url} alt="" />
                </div>
                <div className="m-2 flex-grow">
                    <p className="font-serif">{cartItem.name}</p>
                </div>
                <div className="m-2">
                    <p className="font-serif">£{cartItem.danger_level}</p>
                </div>
                <select className="m-2 border border-solid font-serif" value={monsterQty} onChange={event => setMonsterQty(event.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
                <div className="m-2">
                    <button onClick={handleRemoveMonster} 
                    className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium font-serif rounded-md text-white bg-pink-300 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                    >Remove</button>
                </div>
        </div>
      )
    }
    
export default CartMonster