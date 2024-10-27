import React, { useRef, useEffect, useState, ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import ChevronLeft from "@/assets/icons/fleche-left.svg";
import ChevronRight from "@/assets/icons/fleche-right.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  arrowSize?: string;
  arrowPosition?: {
    left?: string;
    right?: string;
    top?: string;
  };
  arrowColor?: string;
}

// Flèche précédente
const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick, arrowSize, arrowPosition, arrowColor } =
    props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: arrowPosition?.left || "-10%",
        top: arrowPosition?.top || "50%",
        transform: "translateY(-50%)",
        zIndex: 3,
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}>
      <ChevronLeft stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

// Flèche suivante
const NextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick, arrowSize, arrowPosition, arrowColor } =
    props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: arrowPosition?.right || "-10%",
        top: arrowPosition?.top || "50%",
        transform: "translateY(-50%)",
        zIndex: 3,
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}>
      <ChevronRight stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

interface CustomSlideProps {
  children: ReactNode;
  transition?: "slide" | "fade";
  autoplay?: boolean;
  arrowSizeMobile?: string;
  arrowSizeTablet?: string;
  arrowPositionMobile?: {
    left?: string;
    right?: string;
    top?: string;
  };
  arrowPositionTablet?: {
    left?: string;
    right?: string;
    top?: string;
  };
  arrowColorMobile?: string;
  arrowColorTablet?: string;
}

const CustomSlide: React.FC<CustomSlideProps> = ({
  children,
  transition = "slide",
  autoplay = false,
  arrowSizeMobile = "50px",
  arrowSizeTablet = "70px",
  arrowPositionMobile,
  arrowPositionTablet,
  arrowColorMobile = "#000",
  arrowColorTablet = "#000",
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [sliderHeight, setSliderHeight] = useState<string | number>("auto");
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [arrowSize, setArrowSize] = useState(arrowSizeMobile);
  const [arrowPosition, setArrowPosition] = useState({});
  const [arrowColor, setArrowColor] = useState(arrowColorMobile);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(autoplay);

  const updateSliderHeight = (index: number) => {
    const activeSlide = document.querySelector<HTMLElement>(
      `.slick-slide[data-index="${index}"]`
    );
    if (activeSlide) {
      const newHeight = activeSlide.clientHeight;
      setSliderHeight(newHeight);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setIsMobile(true);
        setArrowSize(arrowSizeMobile);
        setArrowPosition(
          arrowPositionMobile || { left: "0%", right: "0%", top: "95%" }
        );
        setArrowColor(arrowColorMobile);
        setIsAutoplayEnabled(false);
      } else {
        setIsMobile(false);
        if (screenWidth >= 640 && screenWidth < 1024) {
          setArrowSize(arrowSizeTablet);
          setArrowPosition(
            arrowPositionTablet || { left: "-5%", right: "-5%", top: "35%" }
          );
          setArrowColor(arrowColorTablet);
          setIsAutoplayEnabled(false);
        } else {
          setArrowSize("80px");
          setArrowPosition({ left: "-10%", right: "-4%", top: "50%" });
          setArrowColor("#000");
          setIsAutoplayEnabled(autoplay);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    arrowSizeMobile,
    arrowSizeTablet,
    arrowPositionMobile,
    arrowPositionTablet,
    arrowColorMobile,
    arrowColorTablet,
    autoplay,
  ]);

  const settings: Settings = {
    dots: !isMobile, // Désactiver les dots Slick sur mobile
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile, // Désactiver les flèches Slick sur mobile
    prevArrow: !isMobile ? (
      <PrevArrow
        arrowSize={arrowSize}
        arrowPosition={arrowPosition}
        arrowColor={arrowColor}
      />
    ) : undefined,
    nextArrow: !isMobile ? (
      <NextArrow
        arrowSize={arrowSize}
        arrowPosition={arrowPosition}
        arrowColor={arrowColor}
      />
    ) : undefined,
    fade: transition === "fade",
    swipe: true,
    touchMove: true,
    autoplay: isAutoplayEnabled,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    afterChange: (index) => {
      updateSliderHeight(index);
      setCurrentSlide(index);
    },
  };

  const renderDotsWithArrows = () => {
    return (
      <div className="flex items-center justify-center relative z-3 mt-20 mb-7">
        <PrevArrow
          onClick={() => sliderRef.current?.slickPrev()}
          arrowSize={arrowSize}
          arrowPosition={arrowPosition}
          arrowColor={arrowColor}
        />
        <div className="mx-4 flex">
          {React.Children.map(children, (_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => sliderRef.current?.slickGoTo(dotIndex)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                  currentSlide === dotIndex
                    ? "var(--accent-color)"
                    : "var(--secondary-color)",
                margin: "0 5px",
                border: "1px solid var(--accent-color)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        <NextArrow
          onClick={() => sliderRef.current?.slickNext()}
          arrowSize={arrowSize}
          arrowPosition={arrowPosition}
          arrowColor={arrowColor}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        height: sliderHeight,
        transition: "height 0.3s ease",
        position: "relative",
      }}>
      <Slider ref={sliderRef} {...settings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} style={{ position: "relative" }}>
            {child}
            {isMobile && renderDotsWithArrows()}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlide;
