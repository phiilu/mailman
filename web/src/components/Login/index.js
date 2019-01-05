import React from "react";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function Login() {
  return (
    <Box>
      <form>
        <FormField>
          <label>Email</label>
          <input type="email" />
        </FormField>
        <FormField>
          <label>Password</label>
          <input type="password" />
        </FormField>

        <Button secondary>Login</Button>
      </form>
    </Box>
  );
}
