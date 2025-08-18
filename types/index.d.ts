// Extend Window types for analytics
interface Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
}

