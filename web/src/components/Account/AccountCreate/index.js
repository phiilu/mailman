import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { formatDataUnit } from "lib/formatDataUnit";

import Box from "components/util/Box";
import Button from "components/util/Button";
import Toggle from "components/util/Toggle";
import { FormField } from "components/util/Form";
import InputRange from "components/util/InputRange";

import { ALL_DOMAINS_QUERY } from "pages/Domains";
import { ALL_ACCOUNTS_QUERY } from "pages/Accounts";
import { COUNT_QUERY } from "components/Pagination";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CREATE_ACCOUNT_MUTATION($data: AccountCreateInput!) {
    createAccount(data: $data) {
      id
      username
      domain {
        id
        domain
      }
      email
      quota
      enabled
      sendonly
    }
  }
`;

export default function AccountCreate({ setShowCreateAccount, domain }) {
  const defaultState = {
    username: "",
    domain: domain || "",
    password: "",
    quota: 0,
    enabled: true,
    sendonly: false
  };

  // state
  const [account, setAccount] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  console.log(domain, account.domain, domain === account.domain, {
    variables:
      domain === account.domain
        ? {
            domain
          }
        : {}
  });

  // GraphQL
  const createAccount = useMutation(CREATE_ACCOUNT_MUTATION, {
    refetchQueries: [
      {
        query: ALL_ACCOUNTS_QUERY,
        variables: { domain }
      },
      { query: COUNT_QUERY },
      { query: ALL_DOMAINS_QUERY }
    ]
  });
  const { data, loading, error } = useQuery(ALL_DOMAINS_QUERY, {
    suspend: false
  });

  if (error) {
    console.log(error);
    return `Error!`;
  }

  const domains = data.domains
    ? data.domains.nodes
    : [{ id: -1, domain: "Loading ..." }];

  useEffect(
    () => {
      setAccount({ ...account, domain: domain || domains[0].domain });
    },
    [domains]
  );

  // Handle input changes
  const handleChange = e =>
    setAccount({ ...account, [e.target.name]: e.target.value });
  const handleRangeChange = quota => setAccount({ ...account, quota });
  const handleToggleChange = field => on =>
    setAccount({ ...account, [field]: on });

  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAccount({
        variables: {
          data: {
            ...account,
            enabled: account.enabled ? 1 : 0,
            sendonly: account.sendonly ? 1 : 0
          }
        }
      });
      setTimeout(() => setAccount(defaultState), 300);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box onClose={() => setShowCreateAccount(false)}>
      {errors && errors[0].message}
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

        <Button secondary disabled={loading || submitting}>
          Create
        </Button>
      </form>
    </Box>
  );
}
