import React from 'react'

type Props = {
  delete: (arg0: string) => void
  id: string
  path: string
}

const ImagePreview: React.FC<Props> = (props) => {
  return (
    <div className="media-thumb" onClick={() => props.delete(props.id)}>
      <img alt="image" src={props.path} />
    </div>
  )
}

export default ImagePreview
