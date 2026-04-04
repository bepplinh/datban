import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Hero from "@/features/landing/components/Hero";
import MenuPreview from "@/features/landing/components/MenuPreview";
import ChefStory from "@/features/landing/components/ChefStory";
import Testimonials from "@/features/landing/components/Testimonials";
import ReservationSystem from "@/features/landing/components/ReservationSystem";
import LocationMap from "@/features/landing/components/LocationMap";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      // Clear hash when scrolling to the very top
      if (window.scrollY === 0 && location.hash) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.hash, navigate]);

  return (
    <>
      <Hero />
      <MenuPreview />
      <ChefStory />
      <Testimonials />
      <ReservationSystem />
      <LocationMap />
    </>
  );
}

export default HomePage;
