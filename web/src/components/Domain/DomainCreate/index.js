import React from "react";
// import {  } from "./DomainEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function DomainCreate({ setShowCreateDomain }) {
  return (
    <Box onClose={() => setShowCreateDomain(false)}>
      <form action="">
        <FormField>
          <label htmlFor="">Domain</label>
          <input type="text" />
        </FormField>

        <Button secondary>Create</Button>
      </form>
    </Box>
  );
}
