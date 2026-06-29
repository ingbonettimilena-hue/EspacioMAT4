"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const images = [
  { src: "/Andrea.jpeg", alt: "Andrea - Espacio MAT" },
  { src: "/FotoAle.jpeg", alt: "Alejandra - Espacio MAT" },
  { src: "/Gabriela.jpeg", alt: "Gabriela - Espacio MAT" },
  { src: "/Cuencos.jpeg", alt: "Cuencos Tibetanos" },
  { src: "/clasessemanales.jpg", alt: "Clases Semanales" },
  { src: "/CursoLiderazgo.jpg", alt: "Curso de Liderazgo" },
  { src: "/ingreso.jpg", alt: "Espacio MAT" },
];

export function Galeria() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Velocidad de desplazamiento (píxeles por frame)
    let animationId: number;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      
      // Cuando llegamos al final, volvemos al inicio sin salto
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pausar el scroll cuando el mouse está sobre la galería
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicamos las imágenes para crear el efecto de loop infinito
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section id="galeria" className="py-24 md:py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Galería de{" "}
            <span className="text-mat-purple">Fotos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Momentos especiales y experiencias compartidas en Espacio MAT
          </p>
        </motion.div>

        {/* Carrusel automático */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-64 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            ))}
          </div>

          {/* Gradientes en los bordes para efecto de fade */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </motion.div>

        {/* Indicador de interacción */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Pasa el cursor sobre las imágenes para pausar el carrusel
        </motion.p>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Made with Bob
