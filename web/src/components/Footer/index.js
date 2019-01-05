import React from "react";
import { footer } from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={footer}>
      <p>&copy; {new Date().getFullYear()} Florian Kapfenberger</p>
    </footer>
  );
}
