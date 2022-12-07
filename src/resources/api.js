import { getHeaders } from "./get-headers";
import { data } from './mock-data/posts';
const fetchData = promise => promise.then(res => res.json());

export const getPosts = () => Promise.resolve(data)
  // fetchData(
  //   fetch(`api/statuses/home_timeline.json`, {
  //     method: "GET",
  //     headers: getHeaders(),
  //   })
  // );

export const getUseDetails = (user_name) => fetchData(
    fetch(`api/users/show.json?screen_name=${user_name}`, {
      method: "GET",
      headers: getHeaders()
    })
  );

  export const getAllData = (user_name) =>
    fetchData(
      fetch(`api/users/all.json`, {
        method: "GET",
        headers: getHeaders(),
      })
    );

  export const getAllMessages = () =>
    fetchData(
      fetch(`api/direct_messages/events/list.json`, {
        method: "GET",
        headers: getHeaders(),
      })
    );