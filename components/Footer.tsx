"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-4 text-center border-t border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-bold">Tiberias Choir</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
