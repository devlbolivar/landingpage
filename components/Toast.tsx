import { useEffect, useState } from 'react';
import clsx from 'clsx';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  open: boolean;
  onClose: () => void;
};

export function Toast({ message, type = 'success', open, onClose }: ToastProps) {
  const [visible, setVisible] = useState(open);
  useEffect(() => {
    setVisible(open);
    if (open) {
      const id = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(id);
    }
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        'fixed inset-x-0 top-3 z-50 mx-auto w-fit max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-soft',
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      )}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

