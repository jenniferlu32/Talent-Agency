import React from 'react';
import Client from './Client';

export default class Clients extends React.Component {
  constructor() {
    super();
  };

  render() {
    const { clients } = this.props;
    return (
      <div>
        <h2>Clients</h2>
        <ul>
          {
            clients.map(client => {
              return ([
                <li key={client.id+'name'}>{client.name} ({client.clientSkills.length})</li>
              ])
            })
          }
        </ul>
      </div>
    );
  };
};
