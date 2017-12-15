import * as _ from 'lodash';
var ItemSpace = (function () {
    function ItemSpace(id, data) {
        this.id = _.clone(id);
        this.data = _.cloneDeep(data);
    }
    return ItemSpace;
}());
export { ItemSpace };
//# sourceMappingURL=item-space.js.map