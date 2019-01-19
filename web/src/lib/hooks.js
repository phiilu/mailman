import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      username
      domain {
        id
        domain
      }
      quota
      enabled
      sendonly
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      password
      enabled
      sendonly
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`;

export const useUser = () => {
  const [user, setUser] = useState(null);
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    suspend: false
  });

  useEffect(
    () => {
      setUser(data.me);
    },
    [data]
  );

  const [loginError, setLoginError] = useState(null);
  const doLogin = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  const doLogout = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const login = async (email, password) => {
    try {
      await doLogin({
        variables: {
          email,
          password
        }
      });
      setLoginError(null);
    } catch (error) {
      setLoginError(error.graphQLErrors[0].message);
    }
  };

  const logout = async () => {
    await doLogout();
  };

  return { user, login, loginError, logout, loading, error };
};
