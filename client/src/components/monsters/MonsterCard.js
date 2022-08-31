import { Link } from 'react-router-dom'

const MonsterCard = ({monster}) => {

    return (

            <div className="m-4 bg-white max-w-sm flex flex-col overflow-hidden border rounded shadow-lg">
                <div className="flex flex-col flex-grow justify-center">
                    <Link to={`/monster/${monster.id}`}>  
                        <img className="w-full mb-2" src={monster.image_url_one} alt={monster.name} />
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
                        <div className="flex flex-row justify-center px-3 py-1 text-sm font-semibold font-serif text-gray-700 mr-2 mb-2">Danger Level: {monster.danger_level}</div>                        
                        <div className="p-2 text-center">
                            <p  className="inline-block px-3 py-1 text-sm font-semibold font-serif text-black mr-2 mb-2" >Powers: {monster.powers}</p>
                        </div>
                    </div>
            </div>

    )
  }
  
  export default MonsterCard