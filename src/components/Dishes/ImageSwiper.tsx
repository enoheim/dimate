import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import NoImage from '../../assets/img/no_image.png'
import { ImageProps } from '../../reducks/dishes/types'
import 'swiper/css/swiper.css'

type Props = {
  images: ImageProps
}

const ImageSwiper: React.FC<Props> = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  })

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="No Image" />
        </div>
      ) : (
        images.map((image) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="料理写真" />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwiper
