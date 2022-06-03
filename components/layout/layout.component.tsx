import React from "react";
import Navbar from "./navbar.component";

type Props = {
  children: JSX.Element;
};
const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-6 py-6">{children}</main>
    </>
  );
};

export default AppLayout;
