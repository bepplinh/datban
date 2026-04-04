import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { Outlet } from "react-router-dom";

function LayoutClient() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutClient;
