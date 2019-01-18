import React, { useState } from "react";
// import {  } from "./AccountEdit.module.scss";
import { formatDataUnit } from "lib/formatDataUnit";

import Box from "components/util/Box";
import Button from "components/util/Button";
import Toggle from "components/util/Toggle";
import { FormField } from "components/util/Form";
import InputRange from "components/util/InputRange";

const defaultState = {
  username: "",
  domain: "",
  password: "",
  quota: 0,
  enabled: true,
  sendonly: false
};

export default function AccountCreate({
  setShowCreateAccount,
  domains,
  createAccount
}) {
  const [account, setAccount] = useState(defaultState);

  const handleChange = e => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const handleRangeChange = quota => setAccount({ ...account, quota });
  const handleToggleChange = field => on =>
    setAccount({ ...account, [field]: on });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await createAccount({
        variables: {
          ...account,
          enabled: account.enabled ? 1 : 0,
          sendonly: account.sendonly ? 1 : 0
        }
      });
      setAccount(defaultState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box onClose={() => setShowCreateAccount(false)}>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={account.username}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label htmlFor="domain">Domain</label>
          <select name="domain" value={account.domain} onChange={handleChange}>
            {domains.map(domain => (
              <option key={domain.id} value={domain.domain}>
                {domain.domain}
              </option>
            ))}
          </select>
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={account.password}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label htmlFor="quota">Quota</label>
          <InputRange
            value={account.quota}
            onChange={handleRangeChange}
            minValue={0}
            maxValue={1024 * 100}
            step={1024}
            formatLabel={formatDataUnit}
          />
        </FormField>
        <FormField>
          <label htmlFor="enabled">Enabled</label>
          <Toggle
            on={account.enabled}
            onToggle={handleToggleChange("enabled")}
          />
        </FormField>
        <FormField>
          <label htmlFor="sendonly">Sendonly</label>
          <Toggle
            on={account.sendonly}
            onToggle={handleToggleChange("sendonly")}
          />
        </FormField>

        <Button secondary>Create</Button>
      </form>
    </Box>
  );
}
