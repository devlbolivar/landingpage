import { ComponentProps, ReactElement, cloneElement, forwardRef, isValidElement } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

const baseClasses =
  'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-sky-600 focus:ring-sky-300',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-300',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-200',
};

type ButtonProps = {
  variant?: Variant;
  asChild?: boolean;
} & ComponentProps<'button'>;

export const Button = Object.assign(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { className, variant = 'primary', asChild, ...props },
    ref
  ) {
    const classes = clsx(baseClasses, variantClasses[variant], className);
    if (asChild && isValidElement(props.children)) {
      const child = props.children as ReactElement<any>;
      return cloneElement(child, {
        className: clsx(classes, child.props.className),
      });
    }
    return <button ref={ref} className={classes} {...props} />;
  }),
  {}
);

