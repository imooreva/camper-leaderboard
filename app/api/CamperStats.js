var axios = require('axios');
const campersBaseURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/';

module.exports = {
    top100_recent() {
        let reqURL = `${campersBaseURL}recent`;
        return axios.get(reqURL).then((res) => {
            return res.data;
        });
    },    
    top100_alltime() {
        let reqURL = `${campersBaseURL}alltime`;
        return axios.get(reqURL).then((res) => {
            return res.data;
        });
    }    
};


//let reqURL = `${campersBaseURL}recent`;
//axios.get(reqURL).then((res) => {
//    console.log(res.data);
//    return res.data;
//});