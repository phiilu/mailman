import React, { useState } from "react";
// import {  } from "./AliasEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import Toggle from "components/util/Toggle";
import { FormField } from "components/util/Form";
import InputRange from "components/util/InputRange";

import { formatDataUnit } from "lib/formatDataUnit";

export default function AliasEdit({ setShowEditAlias }) {
  const [range, setRange] = useState(0);

  return (
    <Box onClose={() => setShowEditAlias(false)}>
      <form action="">
        <FormField>
          <label htmlFor="">Username</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label htmlFor="">Domain</label>
          <select>
            <option value="example.org">example.org</option>
            <option value="kapfenberger.me">kapfenberger.me</option>
            <option value="steinnacher.at">steinnacher.at</option>
            <option value="stadtkino-hainfeld.at">stadtkino-hainfeld.at</option>
            <option value="mpfilms.at">mpfilms.at</option>
          </select>
        </FormField>
        <FormField>
          <label htmlFor="">Destination Email</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label htmlFor="">Enabled</label>
          <Toggle />
        </FormField>

        <Button secondary>Update</Button>
      </form>
    </Box>
  );
}
