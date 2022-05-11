import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as CarouselCmpo } from 'react-responsive-carousel';

import image01 from '../../../../assets/home/carouselImage01.png';

function Carousel() {
  return (
    <div>
      <CarouselCmpo
        showThumbs={false}
        dynamicHeight
        infiniteLoop
        autoPlay
        interval={5000}
      >
        <div>
          <img src={image01} alt="img1" style={{ height: '400px' }} />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src={image01} alt="img1" style={{ height: '400px' }} />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src={image01} alt="img1" style={{ height: '400px' }} />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </CarouselCmpo>
    </div>
  );
}

export default Carousel;
