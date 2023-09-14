import { ReactNode } from "react";

const Header = ({ children }: { children?: ReactNode }) => {
  return (
    <header>
      {children}
      <div className="bg-primary flex flex-col justify-center items-center p-5 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-600">
          Launches Energy Consumption
        </h1>
      </div>
    </header>
  );
};

export default Header;
