import React, { useState, useEffect } from "react";
// import {  } from "./DomainEdit.module.scss";

import Box from "components/util/Box";
import Button from "components/util/Button";
import { FormField } from "components/util/Form";

export default function DomainEdit({
  domain: currentDomain,
  updateDomain,
  setShowEditDomain,
  setEditDomainId
}) {
  const [domain, setDomain] = useState(currentDomain);

  useEffect(
    () => {
      if (currentDomain) setDomain(currentDomain);
    },
    [currentDomain]
  );

  const handleSubmit = async e => {
    e.preventDefault();

    if (currentDomain.domain === domain.domain) return;

    try {
      const { data } = await updateDomain({
        variables: { id: domain.id, data: { domain: domain.domain } }
      });
      setEditDomainId(data.updateDomain.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box onClose={() => setShowEditDomain(false)}>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="">Domain</label>
          <input
            type="text"
            value={domain.domain}
            onChange={e => setDomain({ ...domain, domain: e.target.value })}
          />
        </FormField>

        <Button secondary>Update</Button>
      </form>
    </Box>
  );
}
