import React from "react";
import { useUser } from "lib/hooks";

import Login from "pages/Login";

const PleaseSignIn = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return "Loading ...";

  if (!user) {
    return (
      <main>
        <Login />
      </main>
    );
  }
  return children;
};

export default PleaseSignIn;
