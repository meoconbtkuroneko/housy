var isRealDevice = false;
var lazy = true;
var isHousy = false;
var itemPerPage = 5;
var maxAdvances = 5;
var housy_domain;
var image_domain;
var priceMaxVal = 'max';
if (isHousy) {
    housy_domain = "http://housy.vn/";
    image_domain = "http://photo.housy.vn/";
}
else {
    housy_domain = "http://dev.housy.vn/";
    image_domain = "http://media.housy.vn/";
}
var oneMillion = 1000000;
var windowHeight = window.innerHeight;
var minNameLength = 4;
var maxNameLength = 50;
var minPassLength = 6;
var maxPassLength = 30;
var minTitleLength = 10;
var maxTitleLength = 60;
var minCommentLength = 10;
var minAdressLength = 10;
var maxAdressLength = 60;
var minPhoneLength = 10;
var maxPhoneLength = 13;
var minIdentifyCardLength = 9;
var maxiIdentifyCardLength = 11;
var minDescriptionLength = 20;
var priceUnit = oneMillion;
var image_domain_resize = image_domain + "images/resize/";
var api = "http://localhost:8100/api/";
if (isRealDevice) {
    api = housy_domain + 'api/v1/';
}
var type_report_reason = {
    REPORT_REASON_OTHER: 0,
    REPORT_REASON_CONTACT_NORMAL: 1,
    REPORT_REASON_CONTACT_FAKE_NUMBER: 2,
    REPORT_REASON_RENTING_WRONG_STATUS: 3,
    REPORT_REASON_RENTING_NOT_LANDLORD: 4
};
export var CONSTANT = Object.freeze({
    API: 'http://housy.vn',
    TITLE_HOUSY: "Housy.vn",
    APP_ID: "housy.app",
    REAL_DEVICE: isRealDevice,
    LAZY: lazy,
    NO_INTERNET: true,
    TESTING: false,
    HOUSY_VN: housy_domain,
    PART_HEADER_HEIGHT: {
        LARGE: 100,
        SMALL: 44
    },
    MAX_ADVANCES: maxAdvances,
    WINDOW_HEIGHT: windowHeight,
    PRICE_UNIT: priceUnit,
    PRICE_HUNDRED_UNIT: priceUnit / 10,
    ITEM_PER_PAGE: itemPerPage,
    STATUS_BAR_COLOR: '#e60080',
    HOUSY_IMAGE: image_domain,
    HOUSY_IMAGE_RESIZE: image_domain_resize,
    DELAY_SHOW_LOGIN: 1,
    TRANSITION: 'right',
    ENABLE_TRANSITION: isRealDevice,
    TIME_REMOVE_MODAL: 220,
    MODAL_ANIMATION: 'no-animation',
    TIME_DELAY_LOAD_VIEW: 500,
    TYPE_DATA: [{
            id: 'renting',
            keyword: 'space_images'
        }, {
            id: 'apartment',
            keyword: 'apartment_images'
        }, {
            id: 'neighborhood',
            keyword: 'neighborhood_images'
        }],
    SERVER: {
        API_UPLOAD_IMAGE: image_domain + '/api/v1/images/upload/',
        API: api,
        VARIABLE: {
            MAX_RECENT_SEARCH: 6
        },
        TYPE_QUERY: {
            'AMENITIES': 'amenities',
            'ADVANTAGES': 'advantages',
            'POLICY_DEPOSIT_TIME': 'policy_deposit_times',
            'POLICY_CONTRACT_TYPE': 'policy_renting_times',
            'RENTER_TYPES': 'renter_types',
            'RULES': 'limitations',
            'CITIES': 'cities',
            'DISTRICTS': 'districts',
            'SPACE_TYPES': 'space_types',
            'HOME_TYPES': 'home_types',
            'SPACE_POSITIONS': 'space_positions',
            'NEIGHBORHOODS': 'neighborhoods',
            'APARTMENTS': 'apartments'
        },
        TYPE_STATUS: {
            RENTING_STATUS_RENTING: 0,
            RENTING_STATUS_DRAFT: 1,
            RENTING_STATUS_PENDING: 2,
            RENTING_STATUS_APPROVED: 3,
            RENTING_STATUS_TAKEN: 5,
            TYPE_SPACE: 1,
        },
        REPORT_TYPE: {
            REPORT_TYPE_USER: 1,
            REPORT_TYPE_RENTING: 2
        },
        FEEDBACK_USER_VAL: [{
                id: type_report_reason.REPORT_REASON_CONTACT_FAKE_NUMBER,
                name: 'Số điện thoại không có thực'
            }, {
                id: type_report_reason.REPORT_REASON_OTHER,
                name: 'Lí do khác'
            },],
        FEEDBACK_SPACE_VAL: [{
                id: type_report_reason.REPORT_REASON_RENTING_WRONG_STATUS,
                name: 'Nhà đã cho thuê'
            }, {
                id: type_report_reason.REPORT_REASON_RENTING_NOT_LANDLORD,
                name: 'Nhà không chính chủ'
            }, {
                id: type_report_reason.REPORT_REASON_OTHER,
                name: 'Lí do khác'
            },],
        TYPE_REPORT_REASON: type_report_reason,
        STATUS_UPLOAD: {
            STATUS_UPLOAD_FAILED: -1,
            STATUS_UPLOAD_NEW: -2,
            STATUS_UPLOAD_UPLOADING: 0,
            STATUS_UPLOAD_SUCCESS: 1,
            STATUS_UPLOAD_PAUSE: 2,
        },
        TYPE_UPLOAD: {
            'UPLOAD_TYPE_HOME': 0,
            'UPLOAD_TYPE_SPACE': 1,
            'UPLOAD_TYPE_USER': 2,
            'UPLOAD_TYPE_APARTMENT': 3,
            'UPLOAD_TYPE_NEIGHBORHOOD': 4,
            'UPLOAD_TYPE_REVIEW': 5,
            'UPLOAD_TYPE_COVER': 6,
        },
        TYPE_COMMENT: {
            COMMENT_TYPE_RENTING: {
                id: 0,
                name: 'listings'
            },
            COMMENT_TYPE_USER: {
                id: 1,
                name: 'users'
            },
            COMMENT_TYPE_APARTMENT: {
                id: 2,
                name: 'apartments'
            },
            COMMENT_TYPE_NEIGHBORHOOD: {
                id: 3,
                name: 'neighborhoods'
            },
        },
        NOTIFICATION_STATUS: {
            'NOTIFICATION_STATUS_READ': 0,
            'NOTIFICATION_STATUS_NOT_READ': 1,
        },
        NOTIFICATION_TYPE: {
            'NOTIFICATION_TYPE_DISCOUNT': 0,
            'NOTIFICATION_TYPE_RENTING': 1,
            'NOTIFICATION_TYPE_APARTMENT': 2,
            'NOTIFICATION_TYPE_NEIGHBORHOOD': 3,
            'NOTIFICATION_TYPE_MESSAGE': 4,
            'NOTIFICATION_TYPE_REJECT_RENTING': 11,
        },
        DISCOUNT_STATUS: {
            NOT_DISCOUNT: 0,
            WAIT_TO_DISCOUNT: 1,
            DISCOUNTED: 2,
        },
        TRASACTION_TYPE: {
            TRANSACTION_WITHDRAW: 1,
            TRANSACTION_DEPOSIT: 2,
            TRANSACTION_NOT_CALCULATE: 3,
            TRANSACTION_TRANSFER_DISCOUNT: 4,
        },
        RESULT_REASON: {
            ER_OK: 'ER_OK'
        },
        TYPE_ROLE: {
            69: {
                id: 69,
                name: 'ROLE_SUPER_ADMIN',
                description: 'Quản trị viên cao cấp'
            },
            10: {
                id: 10,
                name: 'ROLE_ADMIN',
                description: 'Quản trị viên'
            },
            20: {
                id: 20,
                name: 'ROLE_USER',
                description: 'Người dùng khách'
            },
            21: {
                id: 21,
                name: 'ROLE_SPACE_RENTER',
                description: 'Người thuê'
            },
            22: {
                id: 22,
                name: 'ROLE_SPACE_OWNER',
                description: 'Chủ nhà'
            },
            23: {
                id: 23,
                name: 'ROLE_OPERATOR',
                description: 'Quản trị hệ thống'
            },
            24: {
                id: 24,
                name: 'ROLE_PARTNER',
                description: 'Cộng tác viên'
            },
            50: {
                id: 50,
                name: 'ROLE_BROKER',
                description: 'Người môi giới'
            }
        },
        'PREFIX_SPACE_IMAGE_LINK_ONLINE': image_domain + "upload/space-images/",
        'PREFIX_USER_IMAGE_LINK_ONLINE': image_domain + "upload/users/",
        'PREFIX_NEIGHBORHOOD_LINK_ONLINE': image_domain + 'upload/neighborhoods/',
        'PREFIX_APARTMENT_LINK_ONLINE': image_domain + 'upload/apartments/',
        'PREFIX_REVIEW_IMAGE_LINK_ONLINE': image_domain + "upload/reviews/",
        'PREFIX_COVER_IMAGE_LINK_ONLINE': image_domain + "upload/covers/",
        'RESIZE_PREFIX_SPACE_IMAGE_LINK_ONLINE': image_domain_resize + "upload/space-images/",
        'RESIZE_PREFIX_USER_IMAGE_LINK_ONLINE': image_domain_resize + "upload/users/",
        'RESIZE_PREFIX_NEIGHBORHOOD_LINK_ONLINE': image_domain_resize + 'upload/neighborhoods/',
        'RESIZE_PREFIX_APARTMENT_LINK_ONLINE': image_domain_resize + 'upload/apartments/',
        'RESIZE_PREFIX_REVIEW_IMAGE_LINK_ONLINE': image_domain_resize + "upload/reviews/",
        'RESIZE_PREFIX_COVER_IMAGE_LINK_ONLINE': image_domain_resize + "upload/covers/",
        APIS: {
            LOGIN: 'auth.json',
            LOGIN_FACEBOOK: 'auth/social.json',
            REGISTER: 'users.json',
            ALLHOUSE: 'listings.json',
            QUERY: 'query.json',
            DELETE_SPACE_IMAGES: 'space_images/delete_images.json',
            FEEDBACK_USER: 'reports.json',
            DISCOUNT: 'discounts.json',
            RECENT_SEARCH: 'recents.json',
            COMMENT: 'comments.json',
            FORGOT_PASSWORD: 'users/resetPassword.json',
            REGISTER_DEVICE_TOKEN: 'users/registerDeviceToken.json',
            UNREGISTER_DEVICE_TOKEN: 'users/unRegisterDeviceToken.json',
            TRANSACTION: 'transactions.json',
            SEARCH: 'search.json',
            APARTMENTS: 'apartments.json',
            NEIGHBORHOODS: 'neighborhoods.json',
            HOST_TOP: 'users/getHostTop.json',
            ALLHOUSE_OWNER: 'listings/owner.json',
            NOTIFICATION: 'notifications.json',
            FAVORITE: 'favorites.json',
            DELETE_RECENT_SEARCH: 'recents/deleteAllSearch.json',
            GET_DETAIL: function (type, id) {
                return type + "/" + id + ".json";
            },
            HOUSE_DETAIL: function (rentingId) {
                return "listings/" + rentingId + ".json";
            },
            GET_HOUSE_OF: function (type, id) {
                return type + '/' + id + "/listings.json";
            },
            PROFILE: function (userId) {
                return "users/" + userId + ".json";
            },
            DELETE_NOTIFICATION: function (id) {
                return "notifications/" + id + ".json";
            },
            TOOGLE_NOTIFICATION: function (id) {
                return "notifications/read/" + id + ".json";
            },
            DELETE_COMMENT: function (id) {
                return "comments/" + id + ".json";
            },
            UPLOAD_IMAGES: function (type, objectId) {
                return type + "/" + objectId + ".json";
            },
            DOWNLOAD_LIST_REVIEW: function (type, id) {
                return type + '/' + id + "/reviews.json";
            },
            APARTMENT_DETAIL: function (apartmentId) {
                return 'apartments/' + apartmentId + ".json";
            },
            NEIGHBORHOOD_DETAIL: function (neighborhoodId) {
                return 'neighborhoods/' + neighborhoodId + ".json";
            },
            GET_COMMENT: function (type, id) {
                return type + '/' + id + "/comments.json";
            },
        },
    },
    ICON_PATH: housy_domain + "img/assets/sd/",
    TYPE_SPACE: 1,
    TYPE_USER: 2,
    TYPE_APARTMENT: 3,
    TYPE_NEIGHBORHOOD: 4,
    TYPE_REVIEW: 5,
    TYPE_COVER: 6,
    GOOGLE_TYPE_PLACES: [{
            id: 'restaurant',
            name: "Nhà hàng",
            url: 'restaurant',
            icon: 'map-marker-restaurant.png',
        }, {
            id: 'cafe',
            url: 'local_cafe',
            icon: 'map-marker-cafe.png',
            name: 'Quán cà phê'
        }, {
            id: 'grocery_or_supermarket',
            url: 'local_grocery_store',
            icon: 'map-marker-grocery_or_supermarket.png',
            name: 'Siêu thị'
        }, {
            id: 'university',
            url: 'school',
            icon: 'map-marker-school.png',
            name: 'Trường học'
        }, {
            id: 'movie_theater',
            url: 'local_movies',
            icon: 'map-marker-movie_theater.png',
            name: 'Rạp chiếu phim'
        }, {
            id: 'hospital',
            url: 'local_hospital',
            icon: 'map-marker-hospital.png',
            name: 'Bệnh viện'
        }, {
            id: 'bus_station',
            url: 'directions_bus',
            icon: 'map-marker-bus.png',
            name: 'Trạm xe buýt'
        }, {
            id: 'atm',
            url: 'local_atm',
            icon: 'map-marker-atm.png',
            name: 'Atm'
        }, {
            id: 'bank',
            url: 'account_balance',
            icon: 'map-marker-bank1.png',
            name: 'Ngân hàng'
        }, {
            id: 'parking',
            url: 'local_parking',
            icon: 'map-marker-parking.png',
            name: 'Bãi đổ xe'
        }],
    DETECT_LOCATION: {
        HCM: {
            V1: "Hồ Chí Minh",
            V2: "Ho Chi Minh",
            V3: "HCM"
        }
    },
    TYPE_LINK_SOCIAL_CLICK: {
        APARTMENT: "chung-cu/",
        SPACE: "phong/"
    },
    IMAGE: {
        'PREFIX_IMAGE_PATH': 'assets/general/',
        'COVER_IMAGE': 'housy-square_icon.png',
        'COVER_BACKGROUND_IMAGE': 'rock_background.jpg',
        'DEFAULT_IMAGE': "housy_default_image.png",
        'LOADING': "black-mamba.png",
        'NO_IMAGE': 'no-image.jpg',
        'NO_AVATAR': 'empty_avatar.jpg',
        STATIC_MARKER: 'housy-marker.png',
        'FILE_IMAGE_DEVICE_LOCAL': 'file://',
        ICON_NEARBY_PATH: 'assets/nearby_icons/',
        ERR_LOAD: 'err_load.png',
        IMAGE_PATH: 'assets/general/',
        CURRENT_POSITION: 'current-position.png',
        NO_INTERNET: 'no_wifi.png',
    },
    USER_ROLE: {
        RENTER: {
            name: 'renter',
            id: 21,
            description: 'Người thuê'
        },
        OWNER: {
            name: 'owner',
            id: 22,
            description: 'Chủ nhà'
        },
    },
    BASIC_MAP_NAME: 'basic-map',
    REASONS: {
        'ER_OK': 'ER_OK',
        'ER_USER_EXIST': 'ER_USER_EXIST',
        'ER_USER_INVALID_USERNAME': 'ER_USER_INVALID_USERNAME',
        'ER_USER_INVALID_USERNAME_OR_PASSWORD': 'ER_USER_INVALID_USERNAME_OR_PASSWORD',
        'ER_FAILED': 'ER_FAILED',
        'ER_NOT_EXIST': 'ER_NOT_EXIST',
        'ER_SERVER': 'ER_SERVER',
    },
    FORM_VALIDATION: {
        PASSWORD: {
            NAME: 'PASSWORD',
            TYPE: 'password',
            MIN: minPassLength,
            MAX: maxPassLength,
            PLACEHOLDER: 'Mật khẩu có từ ' + minPassLength + ' đến ' + maxPassLength + ' kí tự',
            minlength: 'Mật khẩu cần có ít nhất ' + minPassLength + ' kí tự',
            maxlength: 'Mật khẩu có tối đa ' + maxPassLength + ' kí tự',
            required: 'Vui lòng nhập mật khẩu',
            CHANGE_SUCCESS: 'Mật khẩu đổi thành công',
            CHANGE_ERR: 'Mật khẩu đổi thất bại',
        },
        EMAIL: {
            NAME: 'EMAIL',
            TYPE: 'email',
            required: 'Vui lòng nhập email',
            invalid: 'Email không hợp lệ',
            PLACEHOLDER: 'Email',
            SEND_PASS: 'Chúng tôi đã gửi thông tin mật khẩu đến email của bạn, vui lòng kiểm tra email để biết thêm thông tin',
            NOT_REG_EMAIL: 'Email bạn nhập chưa được đăng ký với Housy',
        },
        NAME: {
            NAME: 'NAME',
            TYPE: 'text',
            MIN: minNameLength,
            MAX: maxNameLength,
            PLACEHOLDER: 'Họ tên',
            required: 'Vui lòng nhập họ tên',
            minlength: 'Họ tên cần có ít nhất ' + minNameLength + ' kí tự',
            maxlength: 'Họ tên có tối đa ' + maxNameLength + ' kí tự',
        },
        TITLE: {
            NAME: 'TITLE',
            TYPE: 'text',
            MIN: minTitleLength,
            MAX: maxTitleLength,
            PLACEHOLDER: 'Tiêu đề nhà (' + minTitleLength + ' đến ' + maxTitleLength + ' kí tự)',
            required: 'Vui lòng nhập tiêu đề nhà',
            minlength: 'Tiêu đề nhà cần có ít nhất ' + minTitleLength + ' kí tự',
            maxlength: 'Tiêu đề nhà có tối đa ' + maxTitleLength + ' kí tự',
        },
        DESCRIPTION: {
            NAME: 'DESCRIPTION',
            TYPE: 'text',
            MIN: minDescriptionLength,
            PLACEHOLDER: 'Mô tả (tối thiểu ' + minDescriptionLength + ' kí tự).',
            required: 'Vui lòng nhập mô tả.',
            invalid: 'Mô tả (tối thiểu ' + minDescriptionLength + ' kí tự).',
            minlength: 'Mô tả tối thiểu ' + minDescriptionLength + ' kí tự.',
        },
        HOME_TYPE_ID: {
            NAME: 'HOME_TYPE_ID',
            TYPE: '',
            required: 'Vui lòng chọn loại nhà',
        },
        SPACE_POSITION_ID: {
            NAME: 'SPACE_POSITION_ID',
            TYPE: '',
            required: 'Vui lòng chọn vị trí nhà',
        },
        PHONE_NUMBER: {
            KEY: 'phone_number',
            NAME: 'PHONE_NUMBER',
            TYPE: 'number',
            required: 'Vui lòng nhập số điện thoại',
            invalid: 'Số điện thoại không hợp lệ',
            PLACEHOLDER: 'Số điện thoại',
            MIN: minPhoneLength,
            MAX: maxPhoneLength,
            minlength: 'Số điện thoại cần có ít nhất ' + minPhoneLength + ' kí tự',
            maxlength: 'Số điện thoại có tối đa ' + maxPhoneLength + ' kí tự',
        },
        ADDRESS: {
            NAME: 'ADDRESS',
            TYPE: 'text',
            invalid: 'Địa chỉ không hợp lệ',
            required: 'Vui lòng nhập địa chỉ',
            PLACEHOLDER: 'Địa chỉ',
            MIN: minAdressLength,
            MAX: maxAdressLength,
            minlength: 'Địa chỉ cần có ít nhất ' + minAdressLength + ' kí tự',
            maxlength: 'Địa chỉ có tối đa ' + maxAdressLength + ' kí tự',
        },
        IDENTIFY_CARD: {
            MIN: minIdentifyCardLength,
            MAX: maxiIdentifyCardLength,
            NAME: 'IDENTIFY_CARD',
            TYPE: 'number',
            invalid: 'Chứng minh nhân dân không hợp lệ',
            required: 'Vui lòng nhập chứng minh nhân dân',
            PLACEHOLDER: 'Chứng minh nhân dân',
            minlength: 'Chứng minh nhân dân cần có ít nhất ' + minIdentifyCardLength + ' kí tự',
            maxlength: 'Chứng minh nhân dân có tối đa ' + maxiIdentifyCardLength + ' kí tự',
        },
        BIRTHDAY: {
            NAME: 'BIRTHDAY',
            TYPE: '',
            invalid: 'Ngày tháng năm sinh không hợp lệ',
            required: 'Vui lòng nhập ngày tháng năm sinh',
            PLACEHOLDER: 'Ngày tháng năm sinh',
        },
        GENDER: {
            NAME: 'GENDER',
            TYPE: '',
            required: 'Vui lòng chọn giới tính',
            PLACEHOLDER: 'Giới tính',
        },
        AREA: {
            NAME: 'AREA',
            TYPE: 'number',
            invalid: 'Diện tích tối thiểu 10 mét vuông',
            required: 'Vui lòng nhập diện tích',
            PLACEHOLDER: 'Diện tích (tối thiểu 10 mét vuông)',
            MIN: 10,
        },
        HEIGHT: {
            NAME: 'HEIGHT',
            TYPE: 'number',
            invalid: 'Chiều dài tối thiểu 2m',
            required: 'Vui lòng nhập chiều dài',
            PLACEHOLDER: 'Chiều dài tối thiểu 2m',
            MIN: 2,
        },
        WIDTH: {
            NAME: 'WIDTH',
            TYPE: 'number',
            invalid: 'Chiều ngang tối thiểu 2m',
            required: 'Vui lòng nhập chiều ngang',
            PLACEHOLDER: 'Chiều ngang (tối thiểu 2m)',
            MIN: 2,
        },
        RENTING_FEE: {
            NAME: 'RENTING_FEE',
            TYPE: 'number',
            invalid: 'Giá cho thuê không hợp lệ',
            required: 'Vui lòng nhập giá cho thuê (triệu)',
            PLACEHOLDER: 'Giá cho thuê',
            MIN: 1 / priceUnit,
        },
        FEEDBACK: {
            NAME: 'FEEDBACK',
            TYPE: 'text',
            required: 'Vui lòng chọn lí do',
            PLACEHOLDER: 'Vui lòng chọn lí do',
        },
        FEEDBACK_STRING: {
            NAME: 'FEEDBACK_STRING',
            TYPE: 'text',
            required: 'Vui lòng điền lí do',
            PLACEHOLDER: 'Vui lòng điền lí do',
        },
        COMMENT: {
            NAME: 'COMMENT',
            TYPE: 'text',
            MIN: minCommentLength,
            PLACEHOLDER: 'Nhập nhận xét (Ít nhất ' + minCommentLength + ' kí tự)',
            required: 'Vui lòng nhập nhận xét',
            minlength: 'Nhận xét cần có ít nhất ' + minCommentLength + ' kí tự',
        },
    },
    LOGIN: {
        'SUCCESS': 'Xin chào, ',
        'ERR': 'Đã xảy ra lỗi trong quá trình đăng nhập. Xin vui lòng thử lại sau',
        'NOT_ACTIVE': 'Email hoặc mật khẩu không đúng hoặc tài khoản chưa được kích hoạt. Vui lòng kiểm tra lại',
    },
    REGISTRATION: {
        'SUCCESS': 'Đã gửi xác nhận kích hoạt tài khoản đến email của bạn. Vui lòng kiểm tra và kích hoạt để sử dụng',
        'ERR': 'Đã có lỗi xảy ra trong quá trình đăng ký. Lỗi không xác định',
        'ER_USER_EXIST': 'Email đã tồn tại',
        'ER_USER_INVALID_USERNAME': 'Email không hợp lệ',
    },
    NOT_ENOUGH_INFO: 'Xin vui lòng nhập đầy đủ các thông tin',
    NOT_ENOUGH_IMAGES: 'Xin vui lòng chọn ít nhất 3 tấm hình',
    NOT_ENOUGH_EMAIL_PASS: 'Vui lòng nhập email và mật khẩu',
    NOT_ENOUGH_ADDRESS: 'Vui lòng nhập địa chỉ',
    CAN_NOT_PREVIEW: 'Xin vui lòng nhập địa chỉ',
    UPLOADING: 'Xin vui lòng thử lại khi đã cập nhật dữ liệu thành công.',
    NO_PHONE_NUMBER: 'Vui lòng nhập số điện thoại để liên hệ',
    NOT_COMPLETE: 'Chức năng chưa hoàn thiện',
    DELETE_SUCCESS: 'Đã xóa',
    COMMENT_YOURSELF: 'Bạn không thể viết nhận xét về chính bạn hoặc nhà của bạn',
    NETWORK: {
        OFFLINE: 'Kết nối lại Internet để nhận được dữ liệu',
        NO_INTERNET_TITLE: 'Không có kết nối Internet.',
        NO_INTERNET_STRING: 'Bạn vui lòng kiểm tra kết nối Internet và thử lại.',
    },
    FAVORITE: {
        'ADD': 'Đã thêm vào danh sách yêu thích.',
        'REMOVE': 'Đã xóa khỏi danh sách yêu thích.',
        'ERR': 'Không thể cập nhật vào danh sách yêu thích.'
    },
    HISTORY: {
        KEY_HISTORY: 'HISTORY',
        DELETE_HISTORY_STR: 'Xóa tất cả lịch sử tìm kiếm?',
        SUCCESS: 'Đã xóa các lịch sử tìm kiếm',
        ERR: 'Lỗi xóa lịch sử',
    },
    OUT_OF_PAGE: 'Bạn đã xem hết các căn nhà cho thuê',
    MORE: {
        STR_PROFILE: 'Thông tin của bạn',
        STR_RENTER: 'Người thuê nhà',
        STR_OWNER: 'Chủ nhà'
    },
    UPDATE: {
        STR_SUCCESS: "Cập nhật thành công",
        STR_ERROR: "Cập nhật thất bại",
        DELETE_QUESTION: "Bạn chắc chắn xóa?",
        DELETE_OK: "Đã xóa",
        DELETE_ERROR: "Chưa xóa được",
        DELETE_IMAGE_ERROR: "Xảy ra lỗi khi xóa hình",
        UPDATING_IMAGE_ERROR: "Xảy ra lỗi khi cập nhật hình",
        UPLOAD_IMAGES_ERR: 'Không thể tải hình lên.',
        UPLOAD_PER_IMAGE_ERR: 'Không thể thêm được hình ',
        QUESTION_UPDATE: 'Bạn có muốn lưu thay đổi?',
    },
    INFO: {
        TITLE: 'Một tiêu đề độc đáo và duy nhất giúp nổi bật giá trị của Phòng bạn cho thuê',
        DESCRIPTION: 'Một chút giới thiệu thông tin chủ nhà ' +
            'sẽ tạo thiện cảm với người đang đi thuê, ' +
            'không những giúp họ hiểu hơn về bạn mà còn là ' +
            'cơ hội để bạn nhanh chóng gặp được những khách thuê lâu dài.',
        AREA: 'Nhập vào diện tích nhà',
        WIDTH: 'Nhập vào chiều ngang căn nhà',
        HEIGHT: 'Nhập vào chiều dài căn nhà',
        PRICE: 'Nhập giá',
        NAME: 'Housy VN',
        EMAIL: 'housyvn@gmail.com',
        PHONE_NUMBER: '01234567890',
        IDENTIFY_CARD: '121212121',
        ADDRESS: 'Nhập địa chỉ nhà bạn',
        RENTER_DESCRIPTION: 'Một vài dòng mô tả về bản thân bạn',
    },
    ERR_GET_DETAIL: 'Không thể lấy được thông tin căn nhà',
    ERR_GET_DETAIL_APARTMENT: 'Không thể lấy được thông tin chung cư',
    ERR_GET_DETAIL_NEIGHBORHOOD: 'Không thể lấy được thông tin khu dân cư',
    ERR_NOT_EXIST: 'Nhà không tồn tại trong hệ thống',
    ERR_GET_HOST_DETAIL: 'Không thể lấy được thông tin',
    ERR_GENERAL: 'Đã xảy ra lỗi, vui lòng thử lại sau',
    MAP: {
        LOAD_MAP_ERR: 'Không thể tải được bản đồ',
        LOADING: 'Đang lấy vị trí hiện tại, vui lòng chờ...',
        POSITION_UNAVAILABLE: 'Không thể tìm được vị trí hiện tại',
        NO_INTERNET: 'Không có kết nối internet, vui lòng kết nối internet để hiển thị các tính năng khác',
        DENIED_PERMANENT: 'Ứng dụng không đủ quyền truy cập vị trí hiện tại của bạn. Vui lòng kiểm tra lại',
    },
    RENTING: {
        RE_PUBLIC_HOUSE: 'Vui lòng liên hệ xxx@xxx.com để được hỗ trợ',
        UNPUBLIC_HOUSE: 'Tin sẽ được gỡ xuống nếu bạn cập nhật thông tin và phải được Housy duyệt để đăng tin lại',
        UNPUBLIC_HOUSE_ERR: 'Không thể gỡ đăng tin',
    },
    RENTING_STATUS_ID: {
        0: "Đang cập nhật...",
        1: "Chưa hoàn tất",
        2: "Đang đợi duyệt",
        3: "Đã duyệt",
    },
    USER_FEEDBACK: {
        TITLE: 'Phản hồi về chủ nhà',
        SUB_TITLE: 'Bạn có điểm không hài lòng về chủ nhà? Hãy chia sẻ với Housy.vn!',
        NO_REASON: 'Vui lòng điền lí do',
        NO_INFO: 'Vui lòng chọn lí do',
    },
    SPACE_FEEDBACK: {
        TITLE: 'Phản hồi về nhà',
        SUB_TITLE: 'Bạn có điểm không hài lòng về căn nhà đang cho thuê? Hãy chia sẻ với Housy.vn!',
        NO_REASON: 'Vui lòng điền lí do',
        NO_INFO: 'Vui lòng chọn lí do',
    },
    REVIEW: {
        SHOW_MORE_REVIEW: "Xem thêm nhận xét",
        NO_MORE_REVIEW: "Đã hết nhận xét",
        DONT_HAVE_REVIEW: "Không có nhận xét"
    },
    NOTIFICATION: {
        READ: 'Đánh dấu đã đọc',
        NOT_READ: 'Đánh dấu chưa đọc',
        NEW_NOTIFICATION: 'Bạn có thông báo mới'
    },
    NEIGHBORHOOD: {
        ERR_GET_DETAIL: 'Không thể lấy thông tin khu dân cư'
    },
    LOG_OUT: 'Bạn chắc chắn muốn đăng xuất?',
    STRING_LOG_OUT: 'Đăng xuất',
    STRING_AGREE: 'Đồng ý',
    STRING_SEND: 'Gửi',
    STRING_UPDATE: 'Cập nhật',
    STRING_DELETE: 'Xóa',
    STRING_CANCEL: 'Hủy',
    STRING_SELECT: 'Chọn',
    WAITING: 'Xin đợi trong giây lát...',
    UPDATING: 'Đang cập nhật thông tin, vui lòng đợi trong giây lát...',
    CLOSE_APP: "Đóng ứng dụng",
    ASK_CLOSE_APP: "Bạn muốn đóng ứng dụng?",
    PLACEHOLDER_APARTMENT: {
        "id": null,
        "name": "..............",
        "address": "..........................................",
        "countReviews": 0,
        "imageCount": 0,
        'apartment_images': [{ url: '' }]
    },
    PLACEHOLDER_NEIGHBORHOOD: {
        "id": null,
        "name": "..............",
        "address": "..........................................",
        "countReviews": 0,
        "imageCount": 0,
        'neighborhood_images': [{ url: '' }]
    },
    PLACEHOLDER_HOUSE: {
        "id": null,
        "title": "..............",
        "address": "..........................................",
        "number_of_bedroom": 0,
        "home_type": {
            "name": "............."
        },
        "area": '.............',
        "renting": {
            "renting_fee": 0,
            user: {}
        },
        'space_images': [{ url: '' }]
    },
    PLACEHOLDER_OWNER: {
        "name": "..............",
        "description": "..........................................",
    },
    SHOW: {
        SHOW_MORE: 'Xem thêm',
        SHOW_LESS: 'Rút gọn'
    },
    TITLES: {
        TITLE: 'Giới thiệu nhà',
        DESCRIPTION: 'Mô tả chi tiết',
        AREA: 'Diện tích',
        WIDTH: 'Chiều ngang',
        HEIGHT: 'Chiều dài',
        PRICE: 'Giá cho thuê',
        NAME: 'Tên',
        EMAIL: 'Email',
        PHONE_NUMBER: 'Số điện thoại',
        IDENTIFY_CARD: 'Chứng minh nhân dân',
        ADDRESS: 'Địa chỉ',
        RENTER_DESCRIPTION: 'Giới thiệu',
        AVATAR: 'Thay đổi ảnh đại diện',
        COVER: 'Thay đổi ảnh nền',
        PASSWORD: 'Đổi mật khẩu',
    },
    RECENT_SEARCH_TYPE: {
        PLACE: 'place',
        SPACE: 'space'
    },
    NEIGHBORHOOD_UTIILITES: [{
            id: '1',
            src: 'assets/utilities_icon/super.png',
            name_utilities: 'Siêu thị'
        },
        {
            id: '2',
            src: 'assets/utilities_icon/res.png',
            name_utilities: 'Quán ăn'
        },
        {
            id: '3',
            src: 'assets/utilities_icon/cafe.png',
            name_utilities: 'Quán cafe'
        },
        {
            id: '4',
            src: 'assets/utilities_icon/school.png',
            name_utilities: 'Nhà trẻ'
        },
        {
            id: '5',
            src: 'assets/utilities_icon/hospital.png',
            name_utilities: 'Bệnh viện'
        },
        {
            id: '6',
            src: 'assets/utilities_icon/cinema.png',
            name_utilities: 'Rạp phim'
        },
        {
            id: '7',
            src: 'assets/utilities_icon/pool.png',
            name_utilities: 'Hồ bơi'
        },
        {
            id: '8',
            src: 'assets/utilities_icon/tennis.png',
            name_utilities: 'Sân tennis'
        },
        {
            id: '9',
            src: 'assets/utilities_icon/golf.png',
            name_utilities: 'Sân golf'
        }
    ],
    APARTMENT_UTIILITES: [{
            id: '1',
            src: 'assets/utilities_icon/super.png',
            name_utilities: 'Siêu thị'
        },
        {
            id: '2',
            src: 'assets/utilities_icon/res.png',
            name_utilities: 'Quán ăn'
        },
        {
            id: '3',
            src: 'assets/utilities_icon/cafe.png',
            name_utilities: 'Quán cafe'
        },
        {
            id: '4',
            src: 'assets/utilities_icon/school.png',
            name_utilities: 'Nhà trẻ'
        },
        {
            id: '5',
            src: 'assets/utilities_icon/cinema.png',
            name_utilities: 'Rạp phim'
        },
        {
            id: '6',
            src: 'assets/utilities_icon/bbq.png',
            name_utilities: 'BBQ'
        },
        {
            id: '7',
            src: 'assets/utilities_icon/pool.png',
            name_utilities: 'Hồ bơi'
        },
        {
            id: '8',
            src: 'assets/utilities_icon/tennis.png',
            name_utilities: 'Sân tennis'
        },
        {
            id: '9',
            src: 'assets/utilities_icon/weightlifting.png',
            name_utilities: 'Gym'
        },
        {
            id: '10',
            src: 'assets/utilities_icon/cleaning-service.png',
            name_utilities: 'Dọn nhà'
        },
        {
            id: '11',
            src: 'assets/utilities_icon/emergency-exit.png',
            name_utilities: 'Thoát hiểm'
        },
        {
            id: '12',
            src: 'assets/utilities_icon/elevator.png',
            name_utilities: 'Thang máy'
        }
    ],
    GENDER: [{
            id: 0,
            name: "Chưa xác định"
        }, {
            id: 1,
            name: "Nam"
        }, {
            id: 2,
            name: "Nữ"
        }],
    LIST_DISTRICTS: [{
            "id": 1,
            "name": "Quận 1",
            "lat": 10.7756587,
            "lng": 106.70042379999995,
            "visited": false,
            "type": 1
        }, {
            "id": 2,
            "name": "Quận 2",
            "lat": 10.7872729,
            "lng": 106.74981049999997,
            "visited": false,
            "type": 1
        }, {
            "id": 3,
            "name": "Quận 3",
            "lat": 10.7843695,
            "lng": 106.6844089,
            "visited": false,
            "type": 1
        }, {
            "id": 4,
            "name": "Quận 4",
            "lat": 10.7578263,
            "lng": 106.70129680000002,
            "visited": false,
            "type": 1
        }, {
            "id": 5,
            "name": "Quận 5",
            "lat": 10.7540279,
            "lng": 106.6633746,
            "visited": false,
            "type": 1
        }, {
            "id": 6,
            "name": "Quận 6",
            "lat": 10.7480929,
            "lng": 106.63523620000001,
            "visited": false,
            "type": 1
        }, {
            "id": 7,
            "name": "Quận 7",
            "lat": 10.7340344,
            "lng": 106.72157870000001,
            "visited": false,
            "type": 1
        }, {
            "id": 8,
            "name": "Quận 8",
            "lat": 10.7240878,
            "lng": 106.62862589999997,
            "visited": false,
            "type": 1
        }, {
            "id": 9,
            "name": "Quận 9",
            "lat": 10.8428402,
            "lng": 106.82868510000003,
            "visited": false,
            "type": 1
        }, {
            "id": 10,
            "name": "Quận 10",
            "lat": 10.7745965,
            "lng": 106.66795419999994,
            "visited": false,
            "type": 1
        }, {
            "id": 11,
            "name": "Quận 11",
            "lat": 10.7629739,
            "lng": 106.65008399999999,
            "visited": false,
            "type": 1
        }, {
            "id": 12,
            "name": "Quận 12",
            "lat": 10.8671531,
            "lng": 106.64133219999997,
            "visited": false,
            "type": 1
        }, {
            "id": 13,
            "name": "Thủ Đức",
            "lat": 10.8494094,
            "lng": 106.75370550000002,
            "visited": false,
            "type": 1
        }, {
            "id": 14,
            "name": "Gò Vấp",
            "lat": 10.8386779,
            "lng": 106.6652904,
            "visited": false,
            "type": 1
        }, {
            "id": 15,
            "name": "Bình Thạnh",
            "lat": 10.8105831,
            "lng": 106.70914219999997,
            "visited": false,
            "type": 1
        }, {
            "id": 16,
            "name": "Tân Bình",
            "lat": 10.8014659,
            "lng": 106.65259739999999,
            "visited": false,
            "type": 1
        }, {
            "id": 17,
            "name": "Tân Phú",
            "lat": 10.7900517,
            "lng": 106.62819009999998,
            "visited": false,
            "type": 1
        }, {
            "id": 18,
            "name": "Phú Nhuận",
            "lat": 10.7991944,
            "lng": 106.6802639,
            "visited": false,
            "type": 1
        }, {
            "id": 19,
            "name": "Bình Tân",
            "lat": 10.7652581,
            "lng": 106.60385350000001,
            "visited": false,
            "type": 1
        }, {
            "id": 20,
            "name": "Củ Chi",
            "lat": 11.0066683,
            "lng": 106.51319669999998,
            "visited": false,
            "type": 1
        }, {
            "id": 21,
            "name": "Hóc Môn",
            "lat": 10.8863934,
            "lng": 106.59229240000002,
            "visited": false,
            "type": 1
        }, {
            "id": 22,
            "name": "Bình Chánh",
            "lat": 10.687392,
            "lng": 106.59385380000003,
            "visited": false,
            "type": 1
        }, {
            "id": 23,
            "name": "Nhà Bè",
            "lat": 10.6952642,
            "lng": 106.70487400000002,
            "visited": false,
            "type": 1
        }, {
            "id": 24,
            "name": "Cần Giờ",
            "lat": 10.5083266,
            "lng": 106.86350040000002,
            "visited": false,
            "type": 1
        }],
    PRICE_ARRAY: [{
            id: 0,
            name: 'Dưới 1 triệu',
            minVal: 0,
            maxVal: oneMillion - 1,
        }, {
            id: 1,
            name: '1 triệu - 5 triệu',
            minVal: oneMillion,
            maxVal: oneMillion * 5 - 1,
        }, {
            id: 2,
            name: '5 triệu - 10 triệu',
            minVal: oneMillion * 5,
            maxVal: oneMillion * 10 - 1,
        }, {
            id: 3,
            name: '10 triệu - 15 triệu',
            minVal: oneMillion * 10,
            maxVal: oneMillion * 15 - 1,
        }, {
            id: 4,
            name: '15 triệu - 20 triệu',
            minVal: oneMillion * 15,
            maxVal: oneMillion * 20 - 1,
        }, {
            id: 5,
            name: '20 triệu - 30 triệu',
            minVal: oneMillion * 20,
            maxVal: oneMillion * 30 - 1,
        }, {
            id: 6,
            name: '30 triệu - 40 triệu',
            minVal: oneMillion * 30,
            maxVal: oneMillion * 40 - 1,
        }, {
            id: 7,
            name: '40 triệu - 50 triệu',
            minVal: oneMillion * 40,
            maxVal: oneMillion * 50 - 1,
        }, {
            id: 8,
            name: 'Trên 50 triệu',
            minVal: oneMillion * 50,
            maxVal: priceMaxVal,
        }],
    RADIUS_ARR: [{
            name: '5km',
            id: 5000
        }, {
            name: '10km',
            id: 10000
        }, {
            name: '15km',
            id: 15000
        }],
    PRICE_MAX_VAL: priceMaxVal,
    KEY_FILTER: {
        KEY_HT: 'home_types',
        KEY_ADV: 'advantages',
        KEY_AME: 'amenities',
        KEY_RULES: 'limitations',
        KEY_SPACE_AME: 'space_amenities',
        KEY_SPACE_ADV: 'space_advantages',
        KEY_SPACE_RULES: 'space_limitations',
        KEY_PRICE: 'price',
        KEY_PRICE_MIN: 'priceMin',
        KEY_PRICE_MAX: 'priceMax',
        KEY_RADIUS: 'radius',
        KEY_IS_VERIFIED: 'is_verified',
    },
    NAME_LISTINGS: "listings",
    BROADCAST: {
        DATA_HAVED_STORAGE: "dataHaveStorage",
        DATA_UPDATE: "localDataUpdate"
    },
    KEY_USERINFO: {
        PHONE_NUMBER: 'phone_number'
    },
    KEY_IMAGES: {
        KEY_HAS_DELETE_IMAGES: 'hasDeleteImages',
        KEY_DELETE_IMAGE_ID: 'deleteImageObj',
        KEY_CURRENT_IMAGES: 'currentImages',
        KEY_SPACE_IMAGES: 'space_images',
        KEY_HAS_NEW_IMAGES: 'hasNewImages',
        KEY_IMAGES_TO_UPLOAD: 'imagesToUpload',
        KEY_IMAGE_DEFAULT: 'image_default',
        KEY_IS_DEFAULT: 'isdefault',
        KEY_IS_FINISHED: 'isFinished',
    },
    KEY_SPACES: {
        RENTING_STATUS: 'renting_status_type_id',
        CONTRACT_TYPE_ID: 'policy_renting_time_id',
        DEPOSIT_TIME_ID: 'policy_deposit_time_id',
        HOME_TYPE_ID: 'home_type_id',
        SPACE_POSITION_ID: 'space_position_id',
        RENTING_FEE: 'renting_fee',
    },
    SELECT_IMAGES: {
        PLACEHOLDER: 'Bạn có thể tải ảnh lên hoặc chụp ảnh',
    },
    KEY_TYPE_UPLOAD_IMAGES: {
        COVER: 'cover',
        PICTURE: 'picture',
    },
    DETAIL_TYPE: {
        LISTINGS: 'listings',
        SPACE: 'space',
        SPACES: 'spaces',
        USERS: 'users',
        USER: 'user',
        APARTMENTS: 'apartments',
        APARTMENT: 'apartment',
        NEIGHBORHOODS: 'neighborhoods',
        NEIGHBORHOOD: 'neighborhood',
        COMMENTS: 'comments',
        NOTIFICATIONS: 'notifications',
        NOTIFICATION: 'notification',
    },
    ERR_TYPE: {
        NO_INTERNET: {
            name: 'no_internet',
            info: 'Không có kết nối Internet. Bạn vui lòng kiểm tra kết nối Internet và thử lại.'
        },
        TIMEOUT: {
            name: 'timeout',
            info: 'Kết nối hết hạn',
            status: 408,
        },
        NOT_FOUND: {
            name: 'not_found',
            info: 'Trang bạn yêu cầu không tồn tại',
            status: 404,
        },
        SERVER: {
            name: 'server',
            info: 'Không thể kết nối đến Housy, bạn vui lòng thử lại sau nhé!',
            status: 500,
        },
        ERR_GENERAL: {
            name: 'general',
            info: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
            status: 0,
        },
        CURRENT_LOCATION: {
            name: 'current_location',
            info: 'Không thể lấy được vị trí hiện tại, vui lòng kiểm tra lại.',
            status: 403,
        },
    },
    CALLBACK_TYPE_ACTION: {
        FAVOURITE: 'favourite',
        REPORT: 'report',
        DELETE_COMMENT: 'delete_comment',
        WRITE_COMMENT: 'write_comment',
        CONTACT_HOST: 'contact_host',
    },
    EVENTS_NAME: {
        COMMENT_CHANGED: 'comment:changed',
        COMMENT_DELETED: 'comment:deleted',
        CURRENT_ITEM_CHANGED: 'CurrentItem:changed',
        DO_CALLBACK_AFTER_LOGINED: 'CallbackAfterLogined:do',
        FINISH_DO_REFRESH: 'finishDoRefresh',
        FINISH_SHOW_LOAD_MORE: 'showMore:finished',
        FINISHED_ALL_LOADING: 'finished:allLoading',
        FINISHED_UPLOAD_IMAGES: 'finishedUploadImages',
        GO_TO_DETAIL: 'goToDetail',
        HARD_BACK_BUTTON_CLICKED: 'hardBackButton:changed',
        HIDE_DIRECTION: 'showDirection:hide',
        HISTORIES_CHANGED: 'Histories:changed',
        HOUSES_CHANGED: 'houses:changed',
        HOUSY_SERVICE_CHANGED: 'HousyService:changed',
        INTERNET_CHANGED: 'Internet:changed',
        LOADING_CHANGED: 'Loading:changed',
        LOGIN_SUCCESS: 'logIn:Successfull',
        LOGOUT_SUCCESS: 'Logout:Successfull',
        MARKER_CLICKED: 'marker:clicked',
        NEARBY_SEARCH_CLICKED: 'nearbySearch:clicked',
        NOTIFICATION_CHANGE_COUNT: 'Notifications:change:count',
        NOTIFICATION_GET: 'Notifications:get',
        NOTIFICATION_GET_TEST: 'Notification:get:test',
        NOTIFICATION_NEW: 'Notifications:new',
        ON_TAB_NOTIFICATION: 'isOnTabNotifications',
        PROFLE_IS_UPDATING: 'Profile:updating',
        RECENT_VIEWS_CHANGED: 'RecentViews:changed',
        RELOAD_INTERNET: 'reloadInternet',
        REMOVE_ITEM_QUEUE_UPLOADING: 'removeItemQueueUploading',
        REPORT_SERVICE_CHANGED: 'ReportService:changed',
        RETRY_ERR_LOAD: 'retryErrLoad',
        ROLE_CHANGED: 'role:changed',
        SETTING_CHANGED: 'setting:changed',
        SELECT_ADDRESS: 'selectAddress',
        SHOW_DIRECTION_CLICKED: 'showDirection:clicked',
        SHOW_MORE_CLICKED: 'showMore:clicked',
        TOGGLE_TABS: 'Tabs:toggle',
        USER_STORAGE_CHANGED: 'UserStorage:change',
    },
});
//# sourceMappingURL=constant.service.js.map