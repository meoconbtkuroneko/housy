import * as _ from 'lodash';
import { CONSTANT } from '../services/constant.service';
var HistorySearch = (function () {
    function HistorySearch(name, lat, lng, place_id, moreParams) {
        this.location = {};
        this.name = name;
        this.location.lat = lat;
        this.location.lng = lng;
        this.place_id = place_id;
    }
    return HistorySearch;
}());
export { HistorySearch };
export var POPULAR_SEARCHS = getPopularSearch();
export function getPopularSearch() {
    var rsArr = [];
    for (var i in CONSTANT.LIST_DISTRICTS) {
        var item = _.cloneDeep(CONSTANT.LIST_DISTRICTS[i]);
        rsArr.push(new HistorySearch(item.name, item.lat, item.lng));
    }
    return rsArr;
}
//# sourceMappingURL=history-search.js.map