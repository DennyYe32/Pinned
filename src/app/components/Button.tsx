import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({
  type = "button",
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className="px-12 py-2 bg-red-700 h-10 mt-2 rounded font-inter font-bold text-white text-center"
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
