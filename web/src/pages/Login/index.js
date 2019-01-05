import React from "react";
import Login from "components/Login";

import { login } from "./Login.module.scss";

export default function LoginPage() {
  return (
    <div className={login}>
      <h1>
        Mailman
        <p>Let's manage some Email</p>
      </h1>
      <Login />
    </div>
  );
}
