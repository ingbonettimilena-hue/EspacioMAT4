import { Header } from "@/components/espacio-mat/header";
import { Hero } from "@/components/espacio-mat/hero";
import { Filosofia } from "@/components/espacio-mat/filosofia";
import { QuienesSomos } from "@/components/espacio-mat/quienes-somos";
import { Proceso } from "@/components/espacio-mat/proceso";
import { Servicios } from "@/components/espacio-mat/servicios";
import { ClasesSemanales } from "@/components/espacio-mat/clases-semanales";
import { CursosTalleres } from "@/components/espacio-mat/cursos-talleres";
import { Galeria } from "@/components/espacio-mat/galeria";
// import { ConoceEspacio } from "@/components/espacio-mat/conoce-espacio";
import { Contacto } from "@/components/espacio-mat/contacto";
import { Footer } from "@/components/espacio-mat/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Filosofia />
      <QuienesSomos />
      <Proceso />
      <Servicios />
      <ClasesSemanales />
      <CursosTalleres />
      <Galeria />
      {/* <ConoceEspacio /> */}
      <Contacto />
      <Footer />
    </main>
  );
}
