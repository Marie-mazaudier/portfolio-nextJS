import React, { useRef } from "react";
import Slider from "react-slick";
import ChevronLeft from "@/assets/icons/fleche-left.svg";
import ChevronRight from "@/assets/icons/fleche-right.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flèche précédente
const PrevArrow = (props: any) => {
  const {
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    arrowSize,
    arrowPosition,
    arrowColor,
  } = props;
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
        zIndex: 1,
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <ChevronLeft stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

// Flèche suivante
const NextArrow = (props: any) => {
  const {
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    arrowSize,
    arrowPosition,
    arrowColor,
  } = props;
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
        zIndex: 1,
        fontSize: arrowSize || "80px",
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <ChevronRight stroke={arrowColor} strokeWidth="1px" />
    </div>
  );
};

interface CustomSlideProps {
  children: React.ReactNode; // Les enfants à l'intérieur du slider
  transition?: "fade" | "slide"; // Type de transition : 'fade' ou 'slide'
  autoplay?: boolean; // Option pour activer/désactiver l'autoplay
  arrowSizeMobile?: string; // Taille des flèches pour mobile
  arrowSizeTablet?: string; // Taille des flèches pour tablette
  arrowPositionMobile?: { left?: string; right?: string; top?: string }; // Position des flèches pour mobile
  arrowPositionTablet?: { left?: string; right?: string; top?: string }; // Position des flèches pour tablette
  arrowColorMobile?: string; // Couleur des flèches pour mobile
  arrowColorTablet?: string; // Couleur des flèches pour tablette
}

const CustomSlide: React.FC<CustomSlideProps> = ({
  children,
  transition = "slide",
  autoplay = false, // L'autoplay est désactivé par défaut
  arrowSizeMobile = "50px", // Taille des flèches sur mobile par défaut
  arrowSizeTablet = "70px", // Taille des flèches sur tablette par défaut
  arrowPositionMobile = { left: "-8%", right: "-8%", top: "50%" }, // Position par défaut des flèches sur mobile
  arrowPositionTablet = { left: "-5%", right: "-5%", top: "50%" }, // Position par défaut des flèches sur tablette
  arrowColorMobile = "#000", // Couleur par défaut des flèches sur mobile
  arrowColorTablet = "#000", // Couleur par défaut des flèches sur tablette
}) => {
  const sliderRef = useRef<any>(null); // Référence pour contrôler le slider

  // Détecter la taille de l'écran pour changer la taille, position et couleur des flèches
  const [arrowSize, setArrowSize] = React.useState(arrowSizeMobile);
  const [arrowPosition, setArrowPosition] = React.useState(arrowPositionMobile);
  const [arrowColor, setArrowColor] = React.useState(arrowColorMobile);

  React.useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setArrowSize(arrowSizeMobile); // Appliquer la taille des flèches pour mobile
        setArrowPosition(arrowPositionMobile); // Appliquer la position des flèches pour mobile
        setArrowColor(arrowColorMobile); // Appliquer la couleur des flèches pour mobile
      } else if (screenWidth >= 640 && screenWidth < 1024) {
        setArrowSize(arrowSizeTablet); // Appliquer la taille des flèches pour tablette
        setArrowPosition(arrowPositionTablet); // Appliquer la position des flèches pour tablette
        setArrowColor(arrowColorTablet); // Appliquer la couleur des flèches pour tablette
      } else {
        setArrowSize("80px"); // Taille par défaut (par exemple pour desktop)
        setArrowPosition({ left: "-10%", right: "-4%", top: "50%" }); // Position par défaut pour desktop
        setArrowColor("#000"); // Couleur par défaut (par exemple pour desktop)
      }
    };

    handleResize(); // Appliquer les bonnes valeurs au montage du composant
    window.addEventListener("resize", handleResize); // Écoute les changements de taille

    return () => {
      window.removeEventListener("resize", handleResize); // Nettoyage
    };
  }, [
    arrowSizeMobile,
    arrowSizeTablet,
    arrowPositionMobile,
    arrowPositionTablet,
    arrowColorMobile,
    arrowColorTablet,
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: transition === "fade", // Appliquer l'effet de fondu si 'transition' est 'fade'
    swipe: true, // Activation du swipe
    touchMove: true, // Activation du mouvement par toucher
    nextArrow: (
      <NextArrow
        arrowSize={arrowSize} // Taille de flèche personnalisée en fonction de l'écran
        arrowPosition={arrowPosition} // Position de flèche personnalisée en fonction de l'écran
        arrowColor={arrowColor} // Couleur de flèche en fonction de la taille d'écran
        onMouseEnter={() => sliderRef.current.slickPause()} // Arrête l'autoplay au survol
        onMouseLeave={() => sliderRef.current.slickPlay()} // Redémarre l'autoplay lorsque la souris quitte
      />
    ),
    prevArrow: (
      <PrevArrow
        arrowSize={arrowSize} // Taille de flèche personnalisée en fonction de l'écran
        arrowPosition={arrowPosition} // Position de flèche personnalisée en fonction de l'écran
        arrowColor={arrowColor} // Couleur de flèche en fonction de la taille d'écran
        onMouseEnter={() => sliderRef.current.slickPause()} // Arrête l'autoplay au survol
        onMouseLeave={() => sliderRef.current.slickPlay()} // Redémarre l'autoplay lorsque la souris quitte
      />
    ),
    autoplay, // Définir si l'autoplay est activé ou non
    autoplaySpeed: 2500, // Vitesse de défilement automatique (2500ms)
    pauseOnHover: true, // Met en pause l'autoplay au survol du slider
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};

export default CustomSlide;
