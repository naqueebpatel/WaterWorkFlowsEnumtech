import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import '../../styles/carousel.css';
import image1 from '../../carousalImages/waterworks1.jpg';
import image3 from '../../carousalImages/waterworks3.jpg';
import image4 from '../../carousalImages/waterworks4.jpg';
import Home from './../../pages/Home';

const images = [
    {
        url: `${image1}`,
        caption: "First Image",
    },
    {
        url: `${image3}`,
        caption: "Third Image",
    },
    {
        url: `${image4}`,
        caption: "Fourth Image",
    },
];
const delay = 2500;

function Carousal() {
    const [ index, setIndex ] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [ index ]);
    return (
        <>
            <div className="slideshow">
                <div className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    {images.map((backgroundColor, index) => (
                        <img src={backgroundColor.url} className="slide" key={index} style={{ backgroundColor }} alt={backgroundColor.caption} />
                    ))}
                </div>
                <div className="slideshowDots">
                    {images.map((_, idx) => (
                        <div key={idx}
                            className={`slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}></div>
                    ))}
                </div>
                <Home />
            </div>
        </>
    );
}


export default Carousal;