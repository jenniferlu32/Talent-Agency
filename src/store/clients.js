import axios from 'axios';

//action type constants
const GET_CLIENTS = 'GET_CLIENTS';

//action creator
const _getClients = (clients) => {
  return {
    type: GET_CLIENTS,
    payload: clients
  };
};

//thunks
export const getClients = () => {
  return async(dispatch) => {
    const clients = (await axios.get('/api/clients')).data;
    dispatch(_getClients(clients));
  };
};

//reducer
export default function clientsReducer(state = [], action) {
  switch(action.type) {
    case GET_CLIENTS:
      return action.payload;
    default:
      return state;
  };
};
