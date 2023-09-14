import { ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col w-screen p-2 md:p-10">
      <Header />
      <main className="p-4 min-h-[calc(100vh-100px)] md:px-10 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
