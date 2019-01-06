import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

import DomainList from "components/Domain/DomainList";
import DomainEdit from "components/Domain/DomainEdit";
import DomainCreate from "components/Domain/DomainCreate";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import { home } from "./Domains.module.scss";
import { row, withForm } from "styles/global.module.scss";

import { GET_STATS_QUERY } from "components/Header";

// GraphQL Queries
export const ALL_DOMAINS_QUERY = gql`
  query ALL_DOMAINS_QUERY {
    domains {
      id
      domain
      accounts {
        count
        nodes {
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
    }
  }
`;

const CREATE_DOMAIN_MUTATION = gql`
  mutation CREATE_DOMAIN_MUTATION($domain: String!) {
    createDomain(domain: $domain) {
      id
      domain
    }
  }
`;

const DELETE_DOMAIN_MUTATION = gql`
  mutation DELETE_DOMAIN_MUTATION($id: Int!) {
    deleteDomain(id: $id)
  }
`;

const UPDATE_DOMAIN_MUTATION = gql`
  mutation UPDATE_DOMAIN_MUTATION($id: Int!, $domain: String!) {
    updateDomain(id: $id, domain: $domain) {
      id
      domain
    }
  }
`;

export default function Domains() {
  const [showCreateDomain, setShowCreateDomain] = useState(true);
  const [showEditDomain, setShowEditDomain] = useState(false);
  const [editDomainId, setEditDomainId] = useState(0);

  // querys and mutations
  const createDomain = useMutation(CREATE_DOMAIN_MUTATION, {
    refetchQueries: [{ query: ALL_DOMAINS_QUERY }, { query: GET_STATS_QUERY }]
  });
  const updateDomain = useMutation(UPDATE_DOMAIN_MUTATION, {
    refetchQueries: [{ query: ALL_DOMAINS_QUERY }]
  });
  const deleteDomain = useMutation(DELETE_DOMAIN_MUTATION, {
    refetchQueries: [{ query: ALL_DOMAINS_QUERY }, { query: GET_STATS_QUERY }]
  });
  const { data, loading, error } = useQuery(ALL_DOMAINS_QUERY, {
    suspend: false
  });

  // handle data fetching states
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loading />;

  // get data
  const { domains } = data;
  if (!domains) {
    return "Todo: show add domain view!";
  }

  const editDomain = domains.find(domain => domain.id === editDomainId);

  return (
    <div className={home}>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateDomain || showEditDomain
          })}
        >
          <div className="col">
            <h1>All Domains</h1>
            <DomainList
              domains={domains}
              showCreateDomain={showCreateDomain}
              setShowCreateDomain={setShowCreateDomain}
              showEditDomain={showEditDomain}
              setShowEditDomain={setShowEditDomain}
              deleteDomain={deleteDomain}
              setEditDomainId={setEditDomainId}
            />
          </div>
          <div className="col">
            {domains && showCreateDomain && (
              <>
                <h1>Create Domain</h1>
                <DomainCreate
                  setShowCreateDomain={setShowCreateDomain}
                  createDomain={createDomain}
                />
              </>
            )}
            {domains && showEditDomain && (
              <>
                <h1>Edit Domain</h1>
                <DomainEdit
                  domain={editDomain}
                  updateDomain={updateDomain}
                  setShowEditDomain={setShowEditDomain}
                  setEditDomainId={setEditDomainId}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
