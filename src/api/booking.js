import axios from 'axios';
import { REACT_APP_BACKEND_BASEURL } from '@env';

// config
const request = axios.create({
  baseURL: REACT_APP_BACKEND_BASEURL,
});

const headers = (header_token) => {

  return {
    headers: {
      'Authorization': `Bearer ${header_token}`,
    }
  };
};

export const selectBooking = ({token, header_token}) => {
  const item = token.split('@');
  return request.get(`/multifamily/hotels/${item[0]}/bookings/${item[1]}`, headers(header_token));
}