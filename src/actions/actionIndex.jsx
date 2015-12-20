import $ from 'jQuery';

export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA_SUCCESS = 'RECEIVE_API_DATA_SUCCESS';
export const INITIAL_STATE = {apiData: {}};

function requestApiData(apiPath) {
  return {
    type: REQUEST_API_DATA,
    apiPath
  };
}

function receiveApiDataSucess(json) {
  return {
    type: RECEIVE_API_DATA_SUCCESS,
    apiData: json
  };
}

export function fetchAutomaticApiData(apiPath) {
  return dispatch => {
    dispatch(requestApiData(apiPath));
    $.ajax({
      url: apiPath,
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer 8fb6bd2a78ebeb220db03b2f04f93a05587791d9'
      },
      success: function(data) {
        console.log('success: ', data);
        dispatch(receiveApiDataSucess(data));
      },
      error: function(xhr, status, err) {
        console.log('api request failure: ', err);
      }
    });
  }
}
