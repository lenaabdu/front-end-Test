import axios from 'axios'
//const url = 'http://localhost:7000/'

const url = 'https://back-end-login.herokuapp.com/'

export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider
        this.logoutHandler = logoutHandler
    }

    async login(email, password) {
        return await axios({
            method: 'post',
            url: `${url}auth`,
            data: {
                email,
                password
            }
        });
    }

    autheticatedCall(method, url, data) {
        return axios({
                method,
                url,
                headers: {
                    authorization: this.tokenProvider()
                },
                data
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.logoutHandler();
                    return Promise.reject()
                } else {
                    throw error;
                }
            })
    }

    getAds() {
        return this.autheticatedCall('get', url)
    }

    addAd(location, date ,min_temp, max_temp,wind_speed, wind_dir,wind_speed_night,wind_dir_night) {
        return this.autheticatedCall('post', url, { location, date,min_temp, max_temp,wind_speed, wind_dir,wind_speed_night,wind_dir_night })
    }
    

    removeAd(id) {
        return this.autheticatedCall('delete', `${url}${id}`)
    }

    updateAd(id,location,date,min_temp, max_temp,wind_speed, wind_dir,wind_speed_night,wind_dir_night  ) {
        return this.autheticatedCall('put', `${url}${id}`, {location, date,min_temp, max_temp,wind_speed, wind_dir,wind_speed_night,wind_dir_night})
    }
 
}