import {AsyncStorage} from 'react-native';
import Trending from 'GitHubTrending';

export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};

export default class DataStore {

    /**
     * fetch data/ fetch local first, then online
     * @param url
     * @param flag
     * @returns {Promise}
     */
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url, flag).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })
                }

            }).catch((error) => {
                this.fetchNetData(url, flag).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }

    /**
     * save data
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    /**
     * fetch local data
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * net data
     * @param url
     * @param flag
     * @returns {Promise}
     */
    fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {
            if (flag !== FLAG_STORAGE.flag_trending) {
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then((responseData) => {
                        this.saveData(url, responseData)
                        resolve(responseData);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            } else {
                new Trending().fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw new Error('responseData is null');
                        }
                        this.saveData(url, items);
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    })
            }
        })
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * check whether timestamp is available
     * @param timestamp update time of project
     * @return {boolean} true - no update,false need update
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;//有效期4个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}