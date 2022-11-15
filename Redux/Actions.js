import apiParams from "../config.js";
import axios from "axios";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const LOAD_MORE = "LOAD_MORE";




export function addFavorite(pj) {
  return async function (dispatch) {
    dispatch({ type: ADD_FAVORITE, payload: pj })
  }
}

export function removeFav(id) {
  return async function (dispatch) {
    dispatch({ type: REMOVE_FAVORITE, payload: id })
  }
}

export function getCharacters(name) {
  return function (dispatch) {
    const { ts, apikey, hash, baseURL } = apiParams;
    name
      ? axios
          .get(`${baseURL}/v1/public/characters`, {
            params: {
              ts,
              apikey,
              hash,
              nameStartsWith: name,
            },
          })
          .then((response) =>
            dispatch({
              type: GET_CHARACTERS,
              payload: response.data.data.results,
            })
          )
      : axios
          .get(`${baseURL}/v1/public/characters`, {
            params: {
              ts,
              apikey,
              hash,
              limit:5,
            },
          })
          .then((response) =>
            dispatch({
              type: GET_CHARACTERS,
              payload: response.data.data.results,
            })
          );
  };
}

export function loadMore(offset) {
  return async function (dispatch) {
    const { ts, apikey, hash, baseURL } = apiParams;
    const response = await axios(`${baseURL}/v1/public/characters`, {
            params: {
              ts,
              apikey,
              hash,
              offset:offset,
              limit:5
            },
          })
          
          dispatch({type: LOAD_MORE,payload: response.data.data.results})
          }
        }