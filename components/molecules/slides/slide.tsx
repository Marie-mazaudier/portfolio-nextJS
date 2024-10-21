import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import ChevronLeft from "@/assets/icons/fleche-left.svg";
import ChevronRight from "@/assets/icons/fleche-right.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flèche précédente
const PrevArrow = (props: any) => {
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
        zIndex: 2, // Important pour rendre visible au-dessus des autres éléments
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}>
      <ChevronLeft stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

// Flèche suivante
const NextArrow = (props: any) => {
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
        zIndex: 2, // Important pour rendre visible au-dessus des autres éléments
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}>
      <ChevronRight stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

const CustomSlide: React.FC<any> = ({
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
  const sliderRef = useRef<any>(null);
  const [sliderHeight, setSliderHeight] = useState<number | string>("auto");

  // Utilisation des hooks pour gérer la taille des flèches et autres réglages
  const [arrowSize, setArrowSize] = useState(arrowSizeMobile);
  const [arrowPosition, setArrowPosition] = useState(arrowPositionMobile);
  const [arrowColor, setArrowColor] = useState(arrowColorMobile);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(autoplay);

  // Fonction pour ajuster dynamiquement la hauteur du slider en fonction de la diapositive active
  const updateSliderHeight = (index: number) => {
    const activeSlide = document.querySelector(
      `.slick-slide[data-index="${index}"]`
    );
    if (activeSlide) {
      const newHeight = activeSlide.clientHeight;
      setSliderHeight(newHeight);
    }
  };

  useEffect(() => {
    // Ajustement de la taille en fonction de la largeur de l'écran
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setArrowSize(arrowSizeMobile);
        setArrowPosition(arrowPositionMobile);
        setArrowColor(arrowColorMobile);
        setIsAutoplayEnabled(false);
      } else if (screenWidth >= 640 && screenWidth < 1024) {
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
    };

    // Appliquer la fonction une première fois et ensuite sur chaque redimensionnement
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
    // Initialiser la hauteur sur la première diapositive
    updateSliderHeight(0);
  }, []);

  const settings = {
    dots: true,
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
    afterChange: (index: number) => updateSliderHeight(index), // Ajuster la hauteur après chaque changement de slide
  };

  return (
    <div
      style={{
        position: "relative",
        height: sliderHeight,
        transition: "height 0.3s ease",
      }}>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      {/* Dots en dehors du slider si nécessaire */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          zIndex: 2,
        }}>
        {/* Les dots sont générés par slick */}
      </div>
    </div>
  );
};

export default CustomSlide;
