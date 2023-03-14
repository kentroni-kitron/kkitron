import { useState } from 'react';

import { Spinner, Header } from '../../components';

import { withApi } from '../../api/client-api';
import {
  useCreateOAuthClientMutation,
  useGetOAuthClientsQuery,
} from '../../api/oauth-client/oauth-client.gql.gen';
import {
  useCreateOAuthRedirectUriMutation,
} from '../../api/oauth-redirect-uri/oauth-redirect-uri.gql.gen';
import { useCreateOAuthScopeMutation } from '../../api/oauth-scope/oauth-scope.gql.gen';

import styles from './index.module.scss';

export const OAuthClientsPage = () => {
  const [{ data, fetching }, refetchClients] = useGetOAuthClientsQuery();
  const [, createClient] = useCreateOAuthClientMutation();
  const [, createUri] = useCreateOAuthRedirectUriMutation();
  const [, createScope] = useCreateOAuthScopeMutation();
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isAddingUri, setIsAddingUri] = useState<string>(null);
  const [uri, setUri] = useState('');
  const [isAddingScope, setIsAddingScope] = useState<string>(null);
  const [scopeName, setScopeName] = useState('');

  const toggleAddClient = () => {
    setIsAddingClient(!isAddingClient);
  };

  const toggleAddUri = (id: string) => {
    setUri('');
    setIsAddingUri(!id || id === isAddingUri ? null : id);
  };

  const toggleAddScope = (id: string) => {
    setScopeName('');
    setIsAddingScope(!id || id === isAddingScope ? null : id);
  };

  const submitClient = async () => {
    await createClient({ args: { name: clientName } });
    setIsAddingClient(false);
    setClientName('');
  };

  const submitUri = async (clientId: string) => {
    await createUri({ args: { uri, client: { connect: { id: Number(clientId) } } } });
    setIsAddingUri(null);
    setUri('');
    refetchClients();
  };

  const submitScope = async (clientId: string) => {
    await createScope({ args: {
      name: scopeName,
      client: { connect: { id: Number(clientId) },
    } } });
    setIsAddingScope(null);
    setScopeName('');
    refetchClients();
  };

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <Header />
          <h2>OAuth Clients</h2>
          {fetching && <Spinner className={styles.spinner} />}
          {(!fetching && data?.oAuthClients) && (
            <table>
              <thead>
                <tr>
                  <td>id</td>
                  <td>name</td>
                  <td>uris</td>
                  <td>scopes</td>
                </tr>
              </thead>
              <tbody>
                {data.oAuthClients.map(client => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>
                      <ul>
                        {client.redirectUris.map(({ uri }) => <li key={uri}>{uri}</li>)}
                      </ul>
                      {isAddingUri === client.id && (
                        <div style={{ padding: '3px' }}>
                          <label style={{ marginRight: '4px' }} htmlFor="uri">Uri</label>
                          <input
                            id="uri"
                            value={uri}
                            onChange={(event) => setUri(event.target.value)}
                          />
                        </div>
                      )}
                      <button
                        className="small"
                        style={{ marginRight: '4px' }}
                        onClick={() => toggleAddUri(client.id)}
                      >{isAddingUri === client.id ? 'Cancel' : 'Add uri'}</button>
                      {isAddingUri === client.id && (
                        <button
                          className="small"
                          onClick={() => submitUri(client.id)}
                        >Submit</button>
                      )}
                    </td>
                    <td>
                      <ul>
                        {client.scopes.map(({ name }) => <li key={name}>{name}</li>)}
                      </ul>
                      {isAddingScope === client.id && (
                        <div style={{ padding: '3px' }}>
                          <label style={{ marginRight: '4px' }} htmlFor="scope">Scope name</label>
                          <input
                            id="scope"
                            value={scopeName}
                            onChange={(event) => setScopeName(event.target.value)}
                          />
                        </div>
                      )}
                      <button
                        className="small"
                        style={{ marginRight: '4px' }}
                        onClick={() => toggleAddScope(client.id)}
                      >{isAddingScope === client.id ? 'Cancel' : 'Add scope'}</button>
                      {isAddingScope === client.id && (
                        <button
                          className="small"
                          onClick={() => submitScope(client.id)}
                        >Submit</button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr><td colSpan={4}>
                  {isAddingClient && (
                    <div style={{ padding: '3px' }}>
                      <label style={{ marginRight: '4px' }} htmlFor="name">Client name</label>
                      <input
                        id="name"
                        value={clientName}
                        onChange={(event) => setClientName(event.target.value)}
                      />
                    </div>
                  )}
                  <button style={{ marginRight: '4px' }} onClick={toggleAddClient}>{
                    isAddingClient ? 'Cancel' : 'Add client'
                  }</button>
                  {isAddingClient && <button onClick={submitClient}>Submit</button>}
                </td></tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
};

export default withApi(OAuthClientsPage);
