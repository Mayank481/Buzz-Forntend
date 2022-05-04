import axios from 'axios';
import { APIGETPOST_URL } from '../config';

export const loadPost = (
  page,
  limit,
  setPosts,
  setPageLoading,
  setLoadDisable
) => {
  page === 0 && setPageLoading(true);
  setLoadDisable(true);
  axios
    .get(`${APIGETPOST_URL}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    })
    .then((res) => {
      setPosts((prev) => [...prev, ...res.data]);
      setPageLoading(false);
      setLoadDisable(false);
    })
    .catch((err) => {
      console.log(err.message);
      setPageLoading(false);
      setLoadDisable(false);
    });
};

export const totalPosts = async (loginID) => {
  try {
    const res = await axios.get(
      `${APIGETPOST_URL}?page=0&limit=10000000000000000`,
      {
        withCredentials: true,
      }
    );

    const data = res.data;
    const totalPostCount = res.data.length;
    const myPostsCount = data.filter(
      (el) => el.posted_by._id === loginID
    ).length;
     
    return { totalPostCount, myPostsCount };
  
  } catch (error) {
    return { error: true, message: error.message };
  }
};
