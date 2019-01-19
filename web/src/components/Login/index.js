import React, { useState } from "react";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

import { useUser } from "lib/hooks";

export default function Login() {
  const { user, login, loginError } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) return;
    await login(email, password);
  };

  return (
    <Box>
      {loginError && <p>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <FormField>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
        </FormField>
        <FormField>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </FormField>

        <Button type="submit" secondary>
          Login
        </Button>
      </form>
    </Box>
  );
}
