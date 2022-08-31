import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux' 
import { selectMonsterAddedMsg, selectShowMonsterAddedMsg, showMonsterAddedMsgUpdated } from '../../features/cart/cartSlice'

const MonsterAddedAlert = alertMsg => {

    const [showMsg, setShowMsg] = useState(false)
    const monsterAddedMsg = useSelector(selectMonsterAddedMsg)
    const showMonsterAddedMsg = useSelector(selectShowMonsterAddedMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        if (showMonsterAddedMsg) {
            setShowMsg(true)
            const timeout = setTimeout(() => {
                setShowMsg(false)
                dispatch(showMonsterAddedMsgUpdated(false))
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [monsterAddedMsg, showMonsterAddedMsg, dispatch]);

    return (
        <div>
            <div className="fixed mt-12 inset-x-0 mx-auto">
                { showMsg &&
                    <div className="text-center px-4">
                        <div className="p-2 bg-pink-300 items-center text-white leading-none rounded-full flex inline-flex" role="alert">
                            <span className="mr-4"><FontAwesomeIcon className="ml-4" icon={faCartArrowDown} size="lg"/></span>
                            <span className="font-semibold font-serif mr-2 text-left flex-auto">{monsterAddedMsg}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MonsterAddedAlert