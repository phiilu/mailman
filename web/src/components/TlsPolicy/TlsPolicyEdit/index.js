import React from "react";
// import {  } from "./TlsPolicyEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function TlsPolicyEdit({ setShowEditTlsPolicy }) {
  return (
    <Box onClose={() => setShowEditTlsPolicy(false)}>
      <form action="">
        <FormField>
          <label htmlFor="">Domain</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label htmlFor="">Policy</label>
          <select>
            <option value="dane">dane</option>
            <option value="dane-only">dane-only</option>
            <option value="fingerprint">fingerprint</option>
            <option value="verify">verify</option>
            <option value="secure">secure</option>
          </select>
        </FormField>
        <FormField>
          <label htmlFor="">Params</label>
          <input type="text" />
        </FormField>

        <Button secondary>Create</Button>
      </form>
    </Box>
  );
}
