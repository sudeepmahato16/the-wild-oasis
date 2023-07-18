import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  className='',
  type = "button",
  size = "medium",
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button
      className={`btn ${size} ${variant} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
