import React from "react";

export const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">Copyright &copy; {today.getFullYear()}</footer>
  );
};

export default Footer;
