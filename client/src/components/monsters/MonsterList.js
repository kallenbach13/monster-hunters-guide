import { useEffect, useState } from 'react'
import MonsterCard from './MonsterCard'
import { useDispatch, useSelector } from 'react-redux'
import {  selectAllMonsters, selectFetchAllMonstersStatus } from '../../features/monsters/monstersSlice'
import ReactPaginate from 'react-paginate'
import './Pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useParams } from 'react-router-dom'

const MonsterList = () => {
  
  const monsters = useSelector(selectAllMonsters)
  const monstersStatus = useSelector(selectFetchAllMonstersStatus)

  const [data, setData] = useState([])
  const [perPage] = useState(8)
  const [pageCount, setPageCount] = useState(0)
  const { monsterOffset = 0 }= useParams()
  let history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(needsCheckoutRedirectUpdated(false))
  }, [dispatch])

  useEffect(() => {
    const slice = Object.keys(monsters).slice(monsterOffset, monsterOffset + perPage)
    const postData = slice.map(keyName =>
            <MonsterCard
              key={monsters[keyName].id}
              monster={monsters[keyName]} />)
    setData(postData)
    setPageCount(Math.ceil(Object.keys(monsters).length / perPage))
  }, [monsters, monsterOffset, perPage])

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    window.scrollTo(0, 0);
    history.push(`/${Math.ceil(selectedPage * perPage)}`)
  }

  return (
            <div className="flex flex-col flex-grow">
   
            { monstersStatus === 'loading' && <FontAwesomeIcon  className="mt-20 mx-auto" icon="fas fa-spinner" size="4x" spin/>}

              { monstersStatus === 'failed' &&
                <div className="p-4 mt-20 mx-auto max-w-screen-2xl">
                  <h2 className="text-lg text-center">Problem connecting with the server.</h2>
                </div>}

              { monstersStatus === 'succeeded' &&
              <div className="flex flex-grow flex-col">
                <div className="flex-grow">
                  <div className="p-4 flex flex-wrap justify-center max-w-screen-2xl mx-auto">
                    {data}
                  </div>
                </div>
                <div className="p-4 flex justify-center mx-auto">
                  <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                </div>
              </div>
              }
            </div>
    )
  }
  
  export default MonsterList