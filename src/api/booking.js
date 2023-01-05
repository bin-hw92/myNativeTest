import axios from 'axios';
import { REACT_APP_BACKEND_BASEURL } from '@env';

// config
const request = axios.create({
  baseURL: REACT_APP_BACKEND_BASEURL,
});

const headers = () => {
  return {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyLmJoaW5AaDJvaG9zcGl0YWxpdHkuaW8iLCJpYXQiOjE2NzI5MDAwMTgsImV4cCI6MTY3MjkyODgxOH0.hBkMmXTHsTABQeIHVhObp_nPT9xUbcJqyMWUKW1g3N4o`,
    }
  };
};

export const selectBooking = ({token}) => {
  const item = token.split('@');
  console.log(item, REACT_APP_BACKEND_BASEURL,'@');
  return request.get(`/multifamily/hotels/${item[0]}/bookings/${item[1]}`, headers());
}