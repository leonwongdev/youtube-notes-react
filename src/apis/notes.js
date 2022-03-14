import axios from "axios";

export default axios.create({
    baseURL: "https://youtube-note-server.herokuapp.com/api/",
});

// export default axios.create({
//     baseURL: "http://localhost:8080/api/",
// });
