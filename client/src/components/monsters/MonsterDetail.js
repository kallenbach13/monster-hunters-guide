import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMonsterById, selectFetchAllMonstersStatus } from '../../features/monsters/monstersSlice'

const MonsterDetail = () => {
 
  let { id } = useParams()
  const monster = useSelector(state => selectMonsterById(state, id)) 
  const monstersStatus = useSelector(selectFetchAllMonstersStatus)

  return (
      <div className="flex-grow bg-black p-5">
        { monstersStatus === 'succeeded' &&
        <div className="p-10">  
            <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg bg-gray-300">
            <img className="w-full" src={monster.image_url_two} alt={monster.name} />
            <div className="px-6 py-4">
                <div className="font-bold font-serif text-gray-500 text-xl text-center mb-2">{monster.name}</div>
                <p className="text-gray-700 font-serif text-base text-center">
                    {monster.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 text-center">
                <p className="inline-block px-3 py-1 text-sm font-serif font-semibold text-black mx-4 mb-2">Weaknesses: {monster.weaknesses}</p>
            </div>
            </div>
        </div>
        }
      </div>
    )
  }
  
  export default MonsterDetail