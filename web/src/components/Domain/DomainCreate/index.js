import React, { useState } from "react";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function DomainCreate({ setShowCreateDomain, createDomain }) {
  const [domain, setDomain] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    // validations
    if (!domain) return;

    try {
      await createDomain({ variables: { data: { domain } } });
      setDomain("");
    } catch (error) {
      console.log(error);
      // TODO handle Error
    }
  };

  return (
    <Box onClose={() => setShowCreateDomain(false)}>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="">Domain</label>
          <input
            type="text"
            value={domain}
            onChange={e => setDomain(e.target.value)}
          />
        </FormField>

        <Button secondary>Create</Button>
      </form>
    </Box>
  );
}
