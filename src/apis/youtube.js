import axios from 'axios';

const apiKey = 'AIzaSyCFkGEk0WRFAK9zS78ze9-lI3xgneXSw58';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    key: apiKey,
  },
});
