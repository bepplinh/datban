import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const dataNavbar = [
  { href: "/#menu", title: "Thực đơn" },
  { href: "/#chef", title: "Đầu bếp" },
  { href: "/#testimonials", title: "Đánh giá" },
  { href: "/#location", title: "Vị trí" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ onClick = () => {} }) => (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
      {dataNavbar.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="w-full md:w-auto text-center font-inter font-semibold text-text hover:text-primary transition-colors py-2 md:py-0"
          onClick={onClick}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="py-4 sticky top-0 z-50 bg-background border-b border-text/10">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex justify-between items-center relative gap-4">
        {/* 1. Logo */}
        <div 
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="font-outfit text-2xl font-bold text-primary whitespace-nowrap cursor-pointer">
            Warm Restaurant
        </div>

        {/* 2. Nav Content - Hidden on mobile */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* 3. Reserve a Table - Hidden on mobile */}
        <div className="hidden md:block">
          <Link
            to="/#reservation"
            className="btn-primary w-full md:w-auto text-center"
          >
            Đặt bàn ngay
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden bg-transparent border-none text-2xl text-text cursor-pointer pb-1 z-60"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Mobile menu - Absolute overlay */}
        <div
          className={`
          md:hidden
          flex flex-col items-center gap-6
          absolute top-full left-0 w-full
          bg-background p-6
          shadow-md border-b border-text/10
          transition-all duration-300 origin-top z-55
          ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
        >
          <NavLinks onClick={() => setIsOpen(false)} />
          <Link
            to="/#reservation"
            className="btn-primary w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Đặt bàn ngay
          </Link>
        </div>
      </div>
    </nav>
  );
}
