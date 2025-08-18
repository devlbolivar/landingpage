import { Hero } from '@/components/Hero';
import { ValueProps } from '@/components/ValueProps';
import { SocialProof } from '@/components/SocialProof';
import { LeadForm } from '@/components/LeadForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Container>
        <section aria-labelledby="value-props" className="py-12 md:py-16">
          <h2 id="value-props" className="sr-only">Beneficios</h2>
          <ValueProps />
        </section>
      </Container>
      <Container>
        <section aria-labelledby="social-proof" className="py-8 md:py-12">
          <h2 id="social-proof" className="sr-only">Testimonios</h2>
          <SocialProof />
        </section>
      </Container>
      <Container>
        <section id="form" aria-labelledby="lead-form" className="py-12 md:py-16">
          <h2 id="lead-form" className="sr-only">Formulario</h2>
          <LeadForm mode="api" />
        </section>
      </Container>
      <Container>
        <section aria-labelledby="faq" className="py-12 md:py-16">
          <h2 id="faq" className="sr-only">FAQ</h2>
          <FAQ />
        </section>
      </Container>
      <Footer />
    </main>
  );
}

