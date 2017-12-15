import * as _ from 'lodash';
var FeedbackData = (function () {
    function FeedbackData(type, object_id, reason, note) {
        this.type = _.clone(type);
        this.object_id = _.clone(object_id);
        this.reason = _.clone(reason);
        this.note = _.clone(note);
    }
    return FeedbackData;
}());
export { FeedbackData };
//# sourceMappingURL=feedback-data.js.map