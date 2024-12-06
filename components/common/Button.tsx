interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  buttonText,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} bg-[#E9DED3] hover:bg-[#F6F2ED] focus:ring-4 focus:outline-none focus:ring-[#E9DED3] font-medium rounded-md px-4 py-2 dark:bg-[#E9DED3] dark:hover:bg-[#E9DED3] dark:focus:ring-[#E9DED3]`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
