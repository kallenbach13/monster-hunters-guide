import { Link } from 'react-router-dom'

const MonsterCard = ({monster}) => {

    return (

            <div className="m-6 max-w-sm flex w-full bg-gray-100 flex-col overflow-hidden rounded shadow-lg">
                <div className="flex flex-col flex-grow justify-center">
                    <Link to={`/monster/${monster.id}`}>  
                        <img className="object-cover h-80 w-full mb-4" src={monster.image_url_one} alt={monster.name} />
                    </Link>
                </div>  
                    <div className="flex flex-col justify-center h-48">
                        <Link to={`/monster/${monster.id}`}>  
                            <div className="p-2">
                                <div className="font-bold font-serif text-xl text-red-900 text-center mt-2 mb-2">{monster.name}</div>
                            </div>
                        </Link>
                        <div className="flex flex-row justify-center px-3 py-1 text-md font-bold font-serif text-gray-700 mr-2 mb-2">Type: {monster.type}</div> 
                        <div className="flex flex-row justify-center px-3 py-1 text-md font-bold font-serif text-gray-700 mr-2 mb-2">Danger Level: {monster.danger_level}</div>                        
                        <div className="p-2 text-center">
                            <p  className="inline-block px-3 py-1 text-sm font-semibold font-serif text-black mr-2 mb-4" >Powers: {monster.powers}</p>
                        </div>
                    </div>
            </div>

    )
  }
  
  export default MonsterCard