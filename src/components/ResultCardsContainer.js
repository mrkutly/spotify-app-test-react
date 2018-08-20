import React from 'react'
import ResultCard from './ResultCard'


const ResultCardsContainer = (props) => {

  const { searchResults, accessToken, playList } = props

  const mappedResults = searchResults.map(result => {
    return (<ResultCard result={result} key={result.id} accessToken={accessToken} playList={playList} />)
  })

  return (
    <div  className="container" >
      <ul>
        {mappedResults}
      </ul>
    </div>
  )
}

export default ResultCardsContainer
