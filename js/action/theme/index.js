import Types from '../types'
import ThemeDao from "../../expand/dao/ThemeDao";


/**
 * change theme
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme) {
    return {type: Types.THEME_CHANGE, theme: theme}
}
/**
 * Initialization theme
 * @returns {Function}
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeDao().getTheme().then((data) => {
            dispatch(onThemeChange(data))
        })
    }
}
/**
 * show cumstom theme
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show) {
    return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}
