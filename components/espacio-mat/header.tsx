"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { label: "Filosofía", href: "#filosofia" },
  { label: "¿Quiénes Somos?", href: "#quienessomos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Servicios", href: "#servicios" },
  { label: "Clases Semanales", href: "#clases-semanales" },
  { label: "Cursos y Talleres", href: "#cursosytalleres" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/logo.jpeg"
              alt="Espacio MAT Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
              sizes="40px"
              style={{ objectFit: 'cover', width: '40px', height: '40px' }}
            />
          </div>
          <span className="font-serif text-xl font-semibold text-foreground">
            Espacio <span className="text-primary">MAT</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {item.label}
            </button>
          ))}
          {/*<Button
            onClick={() => scrollToSection("#contacto")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
          >
           Agendar
          </Button>*/}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-background border-b border-border/50"
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-muted-foreground hover:text-foreground transition-colors text-left py-2"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("#contacto")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full mt-2"
          >
            Agendar
          </Button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
