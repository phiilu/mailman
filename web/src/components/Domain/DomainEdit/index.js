import React from "react";
// import {  } from "./DomainEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function DomainEdit({ setShowEditDomain }) {
  return (
    <Box onClose={() => setShowEditDomain(false)}>
      <form action="">
        <FormField>
          <label htmlFor="">Domain</label>
          <input type="text" value="example.org" />
        </FormField>

        <Button secondary>Update</Button>
      </form>
    </Box>
  );
}
