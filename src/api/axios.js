import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '72aa3560ada6c2c841d447ad41e0e85a',
    language: 'ko-KR',
  },
});

export default instance;
