import * as _ from 'lodash';
import { CONSTANT } from '../services/constant.service';
var TypeData = (function () {
    function TypeData(id, keyword) {
        this.id = id;
        this.keyword = keyword;
    }
    return TypeData;
}());
export { TypeData };
export function getTypeData() {
    var rsArr = [];
    for (var i in CONSTANT.TYPE_DATA) {
        var item = _.cloneDeep(CONSTANT.TYPE_DATA[i]);
        rsArr.push(new TypeData(item.id, item.keyword));
    }
    return rsArr;
}
export var TYPE_DATA = getTypeData();
//# sourceMappingURL=type-data.js.map