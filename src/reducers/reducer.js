import { 
  REQUEST_API_DATA, 
  RECEIVE_API_DATA_SUCCESS, 
  RECEIVE_API_DATA_ERROR,
  INITIAL_STATE
} from '../actions/actionIndex';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_API_DATA: 
      return Object.assign({}, state, {isFetching: true});
    case RECEIVE_API_DATA_SUCCESS:
      return Object.assign({}, state, {isFetching: false, apiData: action.apiData});
    case RECEIVE_API_DATA_ERROR:
      return Object.assign({}, state, {isFetching: false});
    default:
      return state;
  }
}
