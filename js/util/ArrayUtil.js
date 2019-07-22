export default class ArrayUtil {

    /**
     * Update the array, remove it from the array if the item already exists, add it to the array if it doesn't exist
     * **/
    static updateArray(array, item) {
        for (let i = 0, len = array.length; i < len; i++) {
            let temp = array[i];
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * Remove the specified element from the array
     * @param array
     * @param item to remove
     * @param id
     * @returns {*}
     */
    static remove(array, item, id) {
        if (!array) return;
        for (let i = 0, l = array.length; i < l; i++) {
            const val = array[i];
            if (item === val || val && val[id] && val[id] === item[id]) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    /**
     * Determine if two arrays are equal
     * @return boolean true
     * */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    /**
     * clone array
     * @return Array
     * */
    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, l = from.length; i < l; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }
}