import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from '../../features/orders/ordersSlice'

const OrderMonster = ({monsterId}) => {
    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const monsterDanger = parseFloat(order[monsterId].danger_level) * parseInt(order[monsterId].quantity, 10)

    return (

                  <div className="mx-auto m-4 max-w-md flex flex-col overflow-hidden border rounded shadow-lg">
                    <div className="p-4">
                          <p className="text-gray-700 text-lg text-base text-center">
                            Monster Id: {monsterId} Name: {order[monsterId].name}
                          </p>
                          <p className="text-gray-700 text-lg text-base text-center">
                            Qty: {order[monsterId].quantity} Danger: ${monsterDanger}
                          </p>
                    </div>
                  </div>
    )
}

const OrderDetail = () => {

    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const totalDanger = Object.keys(order).reduce((acc, keyName) => 
      acc + parseFloat(order[keyName].danger_level) * parseInt(order[keyName].quantity, 10), 0)

    return (
          <div className="grid justify-center">
            <div className="mx-auto">
                <h1 className="font-bold text-xl text-center p-2">Order Id: {id}</h1>
                <div>
                    {Object.keys(order).map(monsterId =>
                        <OrderMonster   monsterId={monsterId}
                                        key={monsterId} />
                        )}
                </div>
                <p className="font-bold text-lg text-center p-2">Total Danger: ${totalDanger}</p>
            </div>
          </div>
      )
}
    
export default OrderDetail