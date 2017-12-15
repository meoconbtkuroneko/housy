import * as _ from 'lodash';
import { CONSTANT } from '../services/constant.service';
var FilterData = (function () {
    function FilterData(data) {
        this.radius = 5000;
        this.home_types = [];
        this.is_verified = false;
        this.amenities = [];
        this.advantages = [];
        if (data) {
            if (data[CONSTANT.KEY_FILTER.KEY_RADIUS]) {
                this[CONSTANT.KEY_FILTER.KEY_RADIUS] = _.clone(data[CONSTANT.KEY_FILTER.KEY_RADIUS]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_HT]) {
                this[CONSTANT.KEY_FILTER.KEY_HT] = _.clone(data[CONSTANT.KEY_FILTER.KEY_HT]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_IS_VERIFIED]) {
                this[CONSTANT.KEY_FILTER.KEY_IS_VERIFIED] = _.clone(data[CONSTANT.KEY_FILTER.KEY_IS_VERIFIED]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_AME]) {
                this[CONSTANT.KEY_FILTER.KEY_AME] = _.cloneDeep(data[CONSTANT.KEY_FILTER.KEY_AME]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_ADV]) {
                this[CONSTANT.KEY_FILTER.KEY_ADV] = _.cloneDeep(data[CONSTANT.KEY_FILTER.KEY_ADV]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_PRICE_MIN] || data[CONSTANT.KEY_FILTER.KEY_PRICE_MIN] === 0) {
                this[CONSTANT.KEY_FILTER.KEY_PRICE_MIN] = _.cloneDeep(data[CONSTANT.KEY_FILTER.KEY_PRICE_MIN]);
            }
            if (data[CONSTANT.KEY_FILTER.KEY_PRICE_MAX]) {
                this[CONSTANT.KEY_FILTER.KEY_PRICE_MAX] = _.cloneDeep(data[CONSTANT.KEY_FILTER.KEY_PRICE_MAX]);
            }
        }
    }
    return FilterData;
}());
export { FilterData };
//# sourceMappingURL=filter-data.js.map