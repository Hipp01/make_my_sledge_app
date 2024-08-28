import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assets/images/Home/1.jpg';
import image2 from '../assets/images/Home/2.jpg';
import image3 from '../assets/images/Home/3.jpg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image rounded"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption className='py-0 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <h3 className='text-black p-1 rounded'>
          Winter Adventure
        </h3>
        <p className='text-black px-2'>
        Embracing the winter magic of the North.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image rounded"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption className='py-0 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
        <h3 className='text-black p-1 rounded'>Northern Serenity</h3>
          <p className='text-black px-2'>The wild nature of northern Sweden, where every moment breathes tranquility.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image rounded"
          src={image3}
          alt="Third slide"
        />
        <Carousel.Caption className='py-0 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
        <h3 className='text-black p-1 rounded'>Sled Dogs in Action</h3>
          <p className='text-black px-2'>Power and endurance meet the Arctic wilderness in perfect harmony.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;