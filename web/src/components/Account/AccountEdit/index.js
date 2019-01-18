import React, { useState } from "react";
// import {  } from "./AccountEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import Toggle from "components/util/Toggle";
import { FormField } from "components/util/Form";
import InputRange from "components/util/InputRange";

import { formatDataUnit } from "lib/formatDataUnit";

export default function AccountEdit({ setShowEditAccount }) {
  const [range, setRange] = useState(0);

  return (
    <Box onClose={() => setShowEditAccount(false)}>
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
          <label htmlFor="">Password</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label htmlFor="">Quota</label>
          <InputRange
            value={range}
            onChange={setRange}
            minValue={0}
            maxValue={1024 * 100}
            formatLabel={formatDataUnit}
          />
        </FormField>
        <FormField>
          <label htmlFor="">Enabled</label>
          <Toggle />
        </FormField>
        <FormField>
          <label htmlFor="">Sendonly</label>
          <Toggle />
        </FormField>

        <Button secondary>Create</Button>
      </form>
    </Box>
  );
}
