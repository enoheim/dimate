import 'swiper/css/swiper.css'

import React, { useState } from 'react'
import Swiper from 'react-id-swiper'

import NoImage from '../../assets/img/no_image.png'
import { ImageProps } from '../../reducks/dishes/types'

type Props = {
  images: ImageProps
}

const ImageSwiper: React.FC<Props> = (props) => {
  const [params] = useState({
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
  })

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="media-thumb">
          <img src={NoImage} alt="noimage" />
        </div>
      ) : (
        images.map((image) => (
          <div className="media-thumb" key={image.id}>
            <img src={image.path} alt="dishimage" />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwiper
