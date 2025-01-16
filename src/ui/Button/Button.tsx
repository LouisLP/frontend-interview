import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({ className, ...buttonProps }: ButtonProps) => {
  return <button className={cn(styles.button, className)} {...buttonProps} />;
};
