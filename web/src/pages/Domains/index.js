import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";
import queryString from "query-string";

import DomainList from "components/Domain/DomainList";
import DomainEdit from "components/Domain/DomainEdit";
import DomainCreate from "components/Domain/DomainCreate";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import { home } from "./Domains.module.scss";
import { row, withForm } from "styles/global.module.scss";

import { COUNT_QUERY } from "components/Pagination";

// GraphQL Queries
// $skip: Int = 0, $perPage: Int = ${PER_PAGE}
export const ALL_DOMAINS_QUERY = gql`
  query ALL_DOMAINS_QUERY {
    domains {
      nodes {
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
  }
`;

const CREATE_DOMAIN_MUTATION = gql`
  mutation CREATE_DOMAIN_MUTATION($data: DomainInput!) {
    createDomain(data: $data) {
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
  mutation UPDATE_DOMAIN_MUTATION($id: Int!, $data: DomainInput!) {
    updateDomain(id: $id, data: $data) {
      id
      domain
    }
  }
`;

export default function Domains(props) {
  let page = 1;
  if (props.location) {
    page = queryString.parse(props.location.search).page;
  }

  const [showCreateDomain, setShowCreateDomain] = useState(true);
  const [showEditDomain, setShowEditDomain] = useState(false);
  const [editDomainId, setEditDomainId] = useState(0);

  // querys and mutations
  const createDomain = useMutation(CREATE_DOMAIN_MUTATION, {
    refetchQueries: [
      {
        query: ALL_DOMAINS_QUERY
      },
      { query: COUNT_QUERY }
    ]
  });
  const updateDomain = useMutation(UPDATE_DOMAIN_MUTATION, {
    refetchQueries: [{ query: ALL_DOMAINS_QUERY }]
  });
  const deleteDomain = useMutation(DELETE_DOMAIN_MUTATION, {
    refetchQueries: [
      {
        query: ALL_DOMAINS_QUERY
      },
      { query: COUNT_QUERY }
    ]
  });
  const { data, loading, error } = useQuery(ALL_DOMAINS_QUERY, {
    suspend: false
  });

  const showEditDomainHideCeateDomain = id => {
    if (showCreateDomain) {
      setShowCreateDomain(false);
    }
    setEditDomainId(id);
    setShowEditDomain(true);
  };

  const showCreateDomainHideEditDomain = () => {
    if (showEditDomain) {
      setShowEditDomain(false);
    }
    setShowCreateDomain(true);
  };

  // handle data fetching states
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loading />;

  // get data
  const domains = data.domains.nodes;
  const editDomain = domains.find(domain => domain.id === editDomainId);

  if (!domains) {
    return "Todo: show add domain view!";
  }

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
              showCreateDomainHideEditDomain={showCreateDomainHideEditDomain}
              showEditDomainHideCeateDomain={showEditDomainHideCeateDomain}
              deleteDomain={deleteDomain}
              page={parseFloat(page)}
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
