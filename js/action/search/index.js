import Types from '../types'
import {_projectModels, doCallBack, handleData} from '../ActionUtil'
import ArrayUtil from "../../util/ArrayUtil";
import Utils from "../../util/Utils";

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS = [];

/**
 * search
 * @param inputKey key
 * @param pageSize
 * @param token token connected to the search
 * @param favoriteDao
 * @param popularKeys
 * @param callBack
 * @returns {function(*=)}
 */
export function onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH});
        fetch(genFetchUrl(inputKey)).then(response => {//如果任务取消，则不做任何处理
            return hasCancel(token) ? null : response.json();
        }).then(responseData => {
            if (hasCancel(token, true)) {//如果任务取消，则不做任何处理
                console.log('user cancel');
                return;
            }
            if (!responseData || !responseData.items || responseData.items.length === 0) {
                dispatch({type: Types.SEARCH_FAIL, message: `没找到关于${inputKey}的项目`});
                doCallBack(callBack, `没找到关于${inputKey}的项目`);
                return;
            }
            let items = responseData.items;
            handleData(Types.SEARCH_REFRESH_SUCCESS, dispatch, "", {data: items}, pageSize, favoriteDao, {
                showBottomButton: !Utils.checkKeyIsExist(popularKeys, inputKey),
                inputKey,
            });
        }).catch(e => {
            console.log(e);
            dispatch({type: Types.SEARCH_FAIL, error: e})
        })
    }
}

/**
 * cancel
 * @param token
 * @returns {function(*)}
 */
export function onSearchCancel(token) {
    return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
    }
}

/**
 * 加载更多
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param favoriteDao
 * @param callBack
 * @returns {function(*)}
 */
export function onLoadMoreSearch(pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more',
                    pageIndex: --pageIndex,
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, data => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: data,
                    })
                })
            }
        }, 500);
    }
}

function genFetchUrl(key) {
    return API_URL + key + QUERY_STR;
}

/**
 * check whether token was canceled
 * @param token
 * @param isRemove
 * @returns {boolean}
 */
function hasCancel(token, isRemove) {
    if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
        return true;
    }
    return false;
}


