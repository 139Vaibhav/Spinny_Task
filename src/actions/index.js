import axios from "axios";
import store from "../store";

export const loadMore = () => {
  return {
    type: "LOAD",
  };
};
export const setList = (txt, pgn) => {
  return (dispatch, getState) => {
    const listCard = store.getState().cardList;
    console.log("The listcard data is " + listCard);
    const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
    let pageNum = pgn;
    let searchtxt = txt;
    const request = axios.get(`${apiUrl}${searchtxt}&limit=16&page=${pageNum}`).then((res) => {
      if (res.data.total === 0);
      else {
        let tmpList = [...(pageNum === 1 ? [] : listCard)];
        res.data.results.map(
          (item) => (tmpList = [...tmpList, [item.image_url, item.title, item.mal_id],])
        );
        // dispatch(setList([...tmpList]));
        dispatch({
          type: "LIST",
          payload: [...tmpList],
        })
      }
    })
      .catch((err) => {
        dispatch({
          type: "LIST",
          payload: [],
        })
      })
  };
};
export const reset = () => {
  return {
    type: "RESET",
  };
};