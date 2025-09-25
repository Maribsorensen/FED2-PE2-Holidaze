import type React from 'react';

/**
 * Button component renders a reusable, styled button element.
 *
 * Features:
 * - Supports children content, click handling, and disabled state.
 * - Default button type is 'button'.
 * - Styled with Tailwind CSS; additional styling can be applied via `className`.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content displayed inside the button.
 * @param {string} [props.className] - Additional CSS classes for customization.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Type attribute for the button.
 * @param {() => void} [props.onClick] - Function to call on button click.
 * @param {boolean} [props.disabled=false] - If true, disables the button.
 *
 * @example
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * @returns {JSX.Element} The rendered button element.
 */

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  className = '',
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`font-headings text-white text-transform: uppercase bg-cta rounded-sm px-3 py-1 hover:cursor-pointer hover:bg-cta-hover ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
