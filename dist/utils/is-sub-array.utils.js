"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubArray = isSubArray;
function isSubArray(main, sub) {
    let index = -1;
    return sub.every((element) => (index = main.indexOf(element, index + 1)) !== -1);
}
//# sourceMappingURL=is-sub-array.utils.js.map