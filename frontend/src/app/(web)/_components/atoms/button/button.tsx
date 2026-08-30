"use client";
import classNames from "classnames";
import "./button.css";

export default function Button({
  children,
  href,
  spaceClassName,
  target = "_self",
  containerClassName,
  ...props
}: ButtonProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, target);
    } else {
      props.onClick?.(undefined as any);
    }
  };

  return (
    <div
      className={classNames(
        "relative w-fit button-container",
        containerClassName,
      )}
    >
      <div
        className={classNames(
          "w-3 h-1 absolute bg-white space-custom -top-0.5 right-4 z-20 transition-all! duration-300!",
          spaceClassName,
        )}
      ></div>

      <div
        className={classNames(
          "w-3 h-1 absolute bg-white space-custom -bottom-0.5 left-4 z-20 transition-all! duration-300!",
          spaceClassName,
        )}
      ></div>

      <button
        {...props}
        className={`border-primary border-2 text-primary px-4 py-2 rounded-lg button-css cursor-pointer hover:text-white ${classNames(props.className)}`}
        onClick={handleClick}
      >
        <span className="flex items-center gap-2 relative z-30 justify-center">
          {props.icon && <div className="icon-container">{props.icon}</div>}
          {children}
        </span>
      </button>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  spaceClassName?: string;
  target?: string;
  containerClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
