import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "8cdf2dec3c2667a93ccb05a6179dd336",
  },
});
