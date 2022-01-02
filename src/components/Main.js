import React from 'react';
import { connect } from 'react-redux';
import { getClients } from '../store/clients';
import { HashRouter as Router } from 'react-router-dom';

//components
import Clients from './Clients';

class Main extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.props.getClients();
  }

  render() {
    const { clients } = this.props;
    return (
      <Router>
        <div>
          <h1>ACME Talent Agency</h1>
          {
            clients && <Clients clients={clients} />
          }
        </div>
      </Router>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    clients: state.clients
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClients: () => dispatch(getClients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
