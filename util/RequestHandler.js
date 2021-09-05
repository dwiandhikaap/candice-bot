const axios = require("axios");

const paths = {
    auth: "/api/auth/mhs",
    dataMhs: "/api/personal/init_data_mhs",
    jadwal: "/api/personal/jadwal_kuliah",
    makul: "/api/presensi/list_mk"
}

const hosts = {
    login: `/login`,
    auth: `http://${process.env.HOSTNAME}:${process.env.PORT}`,
    default: `http://mhsmobile.amikom.ac.id`
}

const configs = {
    auth: {
        headers: {
            'User-Agent': 'okhttp/4.2.1',
            'Authorization' : '',
            'Content-Type': 'application/json',
            'Content-Length': '',
            'Connection' : 'Keep-Alive',
            'Accept-Encoding' : 'gzip',
        }
    },

    default : {
        headers: {
            'User-Agent': '@m!k0mXv=#neMob!le',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': '',
            'Connection' : 'Keep-Alive',
            'Accept-Encoding' : 'gzip'
        }
    }
}

async function login(id, password){
    const url = `${hosts['default']}${hosts['login']}`;
    const data = `username=${id}&keyword=${password}`;
    const authConfig = configs['default'];
    authConfig.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,authConfig)
        .then(res => {
            resolve(res.data.access_token);
        })
        .catch(err => {
            reject(err);
        })
    })
}

/* async function _authUser(id, password){
    const url = `${hosts['auth']}${paths['auth']}`;
    const data = JSON.stringify({
        password: password,
        user_id: id 
    })
    const authConfig = configs['auth'];
    authConfig.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise(resolve => {
        axios.post(url,data,authConfig)
        .then(res => {
            //console.log(res.data.access_token);
            resolve(res.data.access_token);
        })
        .catch(err => {
            console.log('Auth Error: ', err.data);
        })
    })
}  */

async function getMhsData(id, password){
    const access_token = await login(id,password);
    const url = `${hosts['default']}${paths['dataMhs']}`;
    const data = ''

    const reqConfig = configs['default'];
    reqConfig.headers.Authorization = `${access_token}`;
    reqConfig.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,reqConfig)
        .then(res => {
            //console.log('Response: ', res.data);
            resolve(res.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}

async function getMakul(id, password, semester, tahun_akademik){
    const access_token = await login(id,password);
    const url = `${hosts['default']}${paths['makul']}`;
    const data = `npm=${id}&semester=${semester}&tahun_akademik=${tahun_akademik}`;

    const reqConfig = configs['default'];
    reqConfig.headers.Authorization = `${access_token}`;
    reqConfig.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,reqConfig)
        .then(res => {
            //console.log('Response: ', res.data);
            resolve(res.data);
        })
        .catch(err => {
            //console.log('Error: ', err);
            reject(err)
        })
    })
}



module.exports = {
    login : login,
    getMhsData : getMhsData,
    getMakul : getMakul
}