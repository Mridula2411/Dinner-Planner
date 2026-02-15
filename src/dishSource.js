import { PROXY_URL, PROXY_KEY } from "./apiConfig";

export function searchDishes(searchParams) {

    searchParams = searchParams || {};

    var params = {};

    if (searchParams.type) {
        params.type = searchParams.type;
    }

    if (searchParams.query) {
        params.query = searchParams.query;
    }

    var queryString = new URLSearchParams(params).toString();
    var url = PROXY_URL + "/recipes/complexSearch";

    if (queryString) {
        url = url + "?" + queryString;
    }

    function responseACB(response) {
        if (!response.ok) {
            throw new Error("API error");
        }
        return response.json();
    }

    function keepResultsACB(data) {
        return data.results;
    }

    return fetch(url, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "396"
        }
    })
    .then(responseACB)
    .then(keepResultsACB);
}
export function getMenuDetails(ids_array) {

    ids_array = ids_array || [];

    var params = {
        ids: ids_array
    };

    var queryString = new URLSearchParams(params).toString();
    var url = PROXY_URL + "/recipes/informationBulk";

    if (queryString) {
        url = url + "?" + queryString;
    }

    function responseACB(response) {
        if (response.status !== 200) {
            throw new Error("HTTP error: " + response.status);
        }
        return response.json();
    }

    return fetch(url, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "396"
        }
    })
    .then(responseACB);
}