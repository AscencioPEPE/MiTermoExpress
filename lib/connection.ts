import axios from 'axios';
import * as env from 'dotenv';

env.config();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  // headers: {}
});
