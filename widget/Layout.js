import React from "react";
import Header from "@/component/Header/Index";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
