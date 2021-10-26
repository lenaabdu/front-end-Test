import axios from 'axios';
//const url = 'http://localhost:7000'

const url = 'https://git.heroku.com/back-end-login.git'

export class Apireg {

    apiCall(method, url, data) {
        return axios({
            method,
            url,
            data
        })
    }



    addUser(email, password,confirmPassword, eircode) {
        return this.apiCall('post', `${url}/register`, { email, password,confirmPassword,eircode  })
    }
    
}