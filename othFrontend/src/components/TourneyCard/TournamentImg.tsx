import React, { useState, useEffect } from "react"

interface TournamentImageProps {
  imageLink?: string
}

const TournamentImage: React.FC<TournamentImageProps> = ({ imageLink }) => {
  const defaultImage = "https://i.ytimg.com/vi/isjoS8N4QZk/maxresdefault.jpg"
  const [src, setSrc] = useState<string>(imageLink || defaultImage)

  const handleError = () => {
    setSrc(defaultImage)
  }

  useEffect(() => {
    setSrc(imageLink || defaultImage)
  }, [imageLink])

  return (
    <img
      style={{ height: "100%", width: "100%" }}
      src={src}
      alt="Tournamentimage"
      onError={handleError} // Sets default on error
    />
  )
}

export default TournamentImage
