import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 py-8 text-sm text-gray-600">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>© {new Date().getFullYear()} Automatiza con IA</p>
        <nav className="flex gap-4">
          <Link href="#" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 rounded">
            Política de Privacidad
          </Link>
          <Link href="#" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 rounded">
            Términos
          </Link>
        </nav>
      </Container>
    </footer>
  );
}

