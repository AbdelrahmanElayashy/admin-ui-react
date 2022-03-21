import { stringify } from "query-string";
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "react-admin";
import { getMasterToken } from "../state/TokensState";

/**
 * Maps react-admin queries to a REST API implemented
 *
 * @example
 * GET_LIST     => GET http://my.api.url/accounts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/accounts/123
 * GET_MANY     => GET http://my.api.url/accounts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/accounts/123
 * CREATE       => POST http://my.api.url/accounts
 * DELETE       => DELETE http://my.api.url/accounts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'accounts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const masterToken = getMasterToken();
    const options = {
      headers: new Headers({
        Authorization: masterToken,
      }),
    };
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const q = params.filter.hasOwnProperty("q") ? params.filter.q : "";
        const skip = (page - 1) * perPage;
        url = `${apiUrl}/${resource}?filter=${q}&skip=${skip}&limit=${perPage}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
          filter: JSON.stringify({ id: params.ids }),
        };
        let idStr = "";
        const queryString = params.ids.map((id) => idStr + `id=${id}`);
        url = `${apiUrl}/${resource}?${idStr}}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = "PUT";
        options.body = JSON.stringify({
          email: params.data.email,
          name: params.data.name,
        });

        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.data.id}`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'accounts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, body } = response;
    const data = JSON.parse(body).data;

    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        // if (!json.hasOwnProperty("totalElements")) {
        //   throw new Error(
        //     "The numberOfElements property must be must be present in the Json response"
        //   );
        // }
        return {
          data: data,
          total: 1000,
        };
      case GET_ONE:
        return {
          data: {
            ...data,
            tokenAdmin: response.json.tokenAdmin,
            tokenRecognition: response.json.tokenRecognition,
          },
        };
      case CREATE:
        return { data: { ...params.data, id: data.id } };
      default:
        return { data: data };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "accounts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }
    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then((response) =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
