
export default class NavigationUtil {
    /**
     * Jump to the specified page
     * @param params
     * @param page
     **/
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /**
     * back to last page
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * back to first page
     * @param navigation
     */
    static resetToHomPage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }

}