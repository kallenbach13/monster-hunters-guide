import { Link } from 'react-router-dom'

function Nav() {

    return (
      <div className="bg-red-900 fixed w-full">
        <div className="max-w-8xl mx-auto flex flex-row justify-around items-center p-2">
              <div className="m-2">
                <Link to="/">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-yellow-300 text-center font-serif whitespace-nowrap mx-2">Monster Hunter's Guide</p>
                </Link>
              </div>
           
        </div>
      </div>
    )
  }
  
  export default Nav