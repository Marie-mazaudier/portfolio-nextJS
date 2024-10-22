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
        right: arrowPosition?.right || "-4%",
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
  arrowPositionMobile = { left: "-8%", right: "-8%", top: "50%" },
  arrowPositionTablet = { left: "-5%", right: "-5%", top: "50%" },
  arrowColorMobile = "#000",
  arrowColorTablet = "#000",
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [sliderHeight, setSliderHeight] = useState<string | number>("auto");
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Utilisation des hooks pour gérer la taille des flèches et autres réglages
  const [arrowSize, setArrowSize] = useState(arrowSizeMobile);
  const [arrowPosition, setArrowPosition] = useState(arrowPositionMobile);
  const [arrowColor, setArrowColor] = useState(arrowColorMobile);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(autoplay);

  // Fonction pour ajuster dynamiquement la hauteur du slider en fonction de la diapositive active
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
        setArrowPosition(arrowPositionMobile);
        setArrowColor(arrowColorMobile);
        setIsAutoplayEnabled(false);
      } else {
        setIsMobile(false);
        if (screenWidth >= 640 && screenWidth < 1024) {
          setArrowSize(arrowSizeTablet);
          setArrowPosition(arrowPositionTablet);
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

  useEffect(() => {
    updateSliderHeight(0);
  }, []);

  const settings: Settings = {
    dots: !isMobile,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: transition === "fade",
    swipe: true,
    touchMove: true,
    nextArrow: (
      <NextArrow
        arrowSize={arrowSize}
        arrowPosition={arrowPosition}
        arrowColor={arrowColor}
      />
    ),
    prevArrow: (
      <PrevArrow
        arrowSize={arrowSize}
        arrowPosition={arrowPosition}
        arrowColor={arrowColor}
      />
    ),
    autoplay: isAutoplayEnabled,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    afterChange: (index) => {
      updateSliderHeight(index);
      setCurrentSlide(index);
    },
  };

  const renderDots = (index: number) => {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          position: "relative",
          zIndex: 3,
        }}>
        {React.Children.map(children, (_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => sliderRef.current?.slickGoTo(dotIndex)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: currentSlide === dotIndex ? "#000" : "#ccc",
              margin: "0 5px",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        height: sliderHeight,
        overflow: isMobile ? "hidden" : "visible",
        transition: "height 0.3s ease",
        position: "relative",
      }}>
      <Slider ref={sliderRef} {...settings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} style={{ position: "relative" }}>
            {child}
            {isMobile && renderDots(index)}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlide;
