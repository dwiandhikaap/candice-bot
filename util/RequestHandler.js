const axios = require("axios");

const paths = {
    auth: "/api/auth/mhs",
    login: `/login`,
    dataMhs: "/api/personal/init_data_mhs",
    jadwal: "/api/personal/jadwal_kuliah",
    makul: "/api/presensi/list_mk",
    khs: "/api/krs/khs",
    transkrip: "/api/krs/transkrip",
    presensi: "/api/v1.3/presensi_mobile/validate_ticket"
}

const hosts = {
    auth: `http://${process.env.AUTH_HOSTNAME}:${process.env.AUTH_PORT}`,
    default: `http://mhsmobile.amikom.ac.id`
}

const configs = {
    //unused but let me keep it here 🤡
    auth: {
        headers: {
            'User-Agent': 'okhttp/5.0.0-alpha.2',
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
    },

    presensi : {
        headers: {
            'User-Agent': '@m!k0mXv=#neMob!le',
            'Content-Type': 'application/json',
            'Content-Length': '',
            'Connection' : 'Keep-Alive',
            'Accept-Encoding' : 'gzip',
        }
    }
}

async function login(id, password){
    const url = `${hosts['default']}${paths['login']}`;
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

// Simulates AMIKOM One mobile auth, i guess (?)
async function authUser(id, password){
    const url = `${hosts['auth']}${paths['auth']}`;
    const data = JSON.stringify({
        password: password,
        user_id: id 
    })
    const authConfig = configs['auth'];
    authConfig.headers["Content-Length"] = Buffer.byteLength(data);

    //console.log(url)
    //console.log(data)
    //console.log(authConfig)

    return new Promise((resolve, reject) => {
        axios.post(url,data,authConfig)
        .then(res => {
            //console.log(res.data.access_token);
            resolve(res.data.access_token);
        })
        .catch(err => {
            //console.log(err.data);
            reject('Auth Error: ', err.data);
        })
    })
}

async function getMhsData(id, password){
    const access_token = await login(id,password);
    const url = `${hosts['default']}${paths['dataMhs']}`;
    const data = ''

    const requestConfigs = configs['default'];
    requestConfigs.headers.Authorization = `${access_token}`;
    requestConfigs.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,requestConfigs)
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

    const requestConfigs = configs['default'];
    requestConfigs.headers.Authorization = `${access_token}`;
    requestConfigs.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,requestConfigs)
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

async function getKhs(id, password, semester, tahun_akademik){
    const access_token = await login(id,password);
    const url = `${hosts['default']}${paths['khs']}`;
    const data = `npm=${id}&semester=${semester}&tahun_akademik=${tahun_akademik}`;

    const requestConfigs = configs['default'];
    requestConfigs.headers.Authorization = `${access_token}`;
    requestConfigs.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,requestConfigs)
        .then(res => {
            //console.log('Response: ', res);
            resolve(res.data);
        })
        .catch(err => {
            //console.log('Error: ', err);
            reject(err)
        })
    })
}

async function getTranskrip(id, password){
    const access_token = await login(id,password);
    const url = `${hosts['default']}${paths['transkrip']}`;
    const data = `npm=${id}`;

    const requestConfigs = configs['default'];
    requestConfigs.headers.Authorization = `${access_token}`;
    requestConfigs.headers["Content-Length"] = Buffer.byteLength(data);

    return new Promise((resolve, reject) => {
        axios.post(url,data,requestConfigs)
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

async function sendPresensi(userData, payload){
    const {nim, password} = userData;
    const access_token = await authUser(nim,password);

    const url = `${hosts['auth']}${paths['presensi']}`;

    // Code below doesn't work on Heroku somehow

    /* 
    const data = JSON.stringify({
        data: payload
    }); 
    */

    let requestConfigs = configs['presensi'];
    requestConfigs.headers.Authorization = `Bearer ${access_token}`;
    requestConfigs.headers["Content-Length"] = Buffer.byteLength(payload);

    console.log(requestConfigs);

    return new Promise((resolve, reject) => {
        axios.post(url,{data: payload},requestConfigs)
        .then(res => {
            console.log('Response: ', res.data);
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
    authUser : authUser,
    getMhsData : getMhsData,
    getMakul : getMakul,
    getKhs : getKhs,
    getTranskrip : getTranskrip,
    sendPresensi : sendPresensi
}