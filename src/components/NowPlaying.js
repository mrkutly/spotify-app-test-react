import React from 'react'

const NowPlaying = (props) => {
  const { track } = props

  return (
    <div>
      <p>Now Playing: {track.artists[0].name} - {track.name} from {track.album.name} </p>
    </div>
  )
}

export default NowPlaying
