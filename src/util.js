/**
 * simple `extend` method
 * @param target
 * @param source
 * @returns {*}
 */
export function extend(target, source) {
    for (let key in source) {
        target[key] = source[key];
    }
    return target;
}

/**
 * noop
 */
export function noop() {

}