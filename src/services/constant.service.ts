var isRealDevice = false;
var lazy = true;
var isHousy = false;
var itemPerPage = 5;

var housy_domain;
var image_domain;

if (isHousy) {
  housy_domain = "http://housy.vn/";
  image_domain = "http://photo.housy.vn/";
} else {
  housy_domain = "http://dev.housy.vn/";
  image_domain = "http://media.housy.vn/";
}

var windowHeight = window.innerHeight;

var minNameLength: number = 4;
var maxNameLength: number = 50;
var minPassLength: number = 6;
var maxPassLength: number = 30;

var image_domain_resize = image_domain + "images/resize/";

var api = "http://localhost:8100/api/";
if (isRealDevice) {
  api = housy_domain + 'api/v1/';
}

export const CONSTANT = Object.freeze({
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

  WINDOW_HEIGHT: windowHeight,

  ITEM_PER_PAGE: itemPerPage,

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
      id: 2,
      name: 'Số điện thoại không có thực'
    }, {
      id: 0,
      name: 'Lí do khác'
    }, ],

    FEEDBACK_SPACE_VAL: [{
      id: 4,
      name: 'Nhà đã cho thuê'
    }, {
      id: 0,
      name: 'Lí do khác'
    }, ],

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
      COMMENT_TYPE_RENTING: 0,
      COMMENT_TYPE_USER: 1,
      COMMENT_TYPE_APARTMENT: 2,
      COMMENT_TYPE_NEIGHBORHOOD: 3
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
    },

    // HOUSE_DETAIL(rentingId: string): string {
    //   return "listings/" + rentingId + ".json";
    // },

    GET_HOUSE_OF: function(type, id) {
      return type + '/' + id + "/listings.json";
    },

    PROFILE: function(userId) {
      return "users/" + userId + ".json";
    },

    HOST_PROFILE: function(hostId) {
      return "users/" + hostId + "/comments.json";
    },

    DELETE_NOTIFICATION: function(id) {
      return "notifications/" + id + ".json";
    },

    TOOGLE_NOTIFICATION: function(id) {
      return "notifications/read/" + id + ".json";
    },

    DELETE_COMMENT: function(id) {
      return "comments/" + id + ".json";
    },

    UPLOAD_IMAGES: function(type, objectId) {
      return type + "/" + objectId + ".json";
    },

    DOWNLOAD_LIST_REVIEW: function(type, id) {
      return type + '/' + id + "/reviews.json";
    },

    APARTMENT_DETAIL: function(apartmentId) {
      return 'apartments/' + apartmentId + ".json";
    },

    NEIGHBORHOOD_DETAIL: function(neighborhoodId) {
      return 'neighborhoods/' + neighborhoodId + ".json";
    },

    GET_COMMENT: function(type, id) {
      return type + '/' + id + "/comments.json";
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
    'FILE_IMAGE_DEVICE_LOCAL': 'file://',
    ICON_NEARBY_PATH: 'assets/nearby_icons/',
  },

  USER_ROLE: {
    'RENTER': 'renter',
    'OWNER': 'owner'
  },

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
      MIN: minPassLength,
      MAX: maxPassLength,
      PLACEHOLDER: 'Mật khẩu có từ ' + minPassLength + ' đến ' + maxPassLength + ' kí tự',
      minlength: 'Mật khẩu phải có ít nhất ' + minPassLength + ' kí tự',
      maxlength: 'Mật khẩu có tối đa ' + maxPassLength + ' kí tự',
      required: 'Vui lòng nhập mật khẩu',
      CHANGE_SUCCESS: 'Mật khẩu đổi thành công',
      CHANGE_ERR: 'Mật khẩu đổi thất bại',
    },
    EMAIL: {
      required: 'Vui lòng nhập email',
      invalid: 'Email không hợp lệ',
      PLACEHOLDER: 'Email',
      SEND_PASS: 'Chúng tôi đã gửi thông tin mật khẩu đến email của bạn, vui lòng kiểm tra email để biết thêm thông tin',
      NOT_REG_EMAIL: 'Email bạn nhập chưa được đăng ký với Housy',
    },
    NAME: {
      MIN: minNameLength,
      MAX: maxNameLength,
      PLACEHOLDER: 'Họ tên',
      required: 'Vui lòng nhập họ tên',
      minlength: 'Họ tên phải có ít nhất ' + minNameLength + ' kí tự',
      maxlength: 'Họ tên có tối đa ' + maxNameLength + ' kí tự',
    },
    PHONE: {
      required: 'Vui lòng nhập số điện thoại',
      invalid: 'Số điện thoại không hợp lệ',
    },
    ADDRESS: {
      required: 'Vui lòng nhập địa chỉ',
    },
    CMND: {
      required: 'Vui lòng nhập chứng minh nhân dân',
    },
    DOB: {
      required: 'Vui lòng nhập ngày tháng năm sinh',
    },
    SEX: {
      required: 'Vui lòng chọn giới tính',
    },
    FEEDBACK: {
      required: 'Vui lòng chọn lí do',
    },
    FEEDBACK_STRING: {
      required: 'Vui lòng điền lí do',
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
  NOT_ENOUGH_ADDRESS: 'Vui lòng nhập hoặc chọn địa chỉ',
  CAN_NOT_PREVIEW: 'Xin vui lòng nhập địa chỉ',
  UPLOADING: 'Xin vui lòng thử lại khi đã cập nhật dữ liệu thành công.',
  NO_PHONE_NUMBER: 'Vui lòng nhập số điện thoại để liên hệ',

  NETWORK: {
    'OFFLINE': 'Kết nối lại Internet để nhận được dữ liệu'
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
  STRING_CANCEL: 'Hủy',
  WAITING: 'Xin đợi trong giây lát...',
  UPDATING: 'Đang cập nhật giá trị, vui lòng đợi trong giây lát...',

  PLACEHOLDER_APARTMENT: {
    "id": 255,
    "name": "..............",
    "address": "..........................................",
    "countReviews": 0,
    "imageCount": 0,
    'apartment_images': [{ url: '' }]
  },

  PLACEHOLDER_NEIGHBORHOOD: {
    "id": 255,
    "name": "..............",
    "address": "..........................................",
    "countReviews": 0,
    "imageCount": 0,
    'neighborhood_images': [{ url: '' }]
  },

  PLACEHOLDER_HOUSE: {
    "id": 30,
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
      src: '../assets/utilities_icon/super.png',
      name_utilities: 'Siêu thị'
    },

    {
      id: '2',
      src: '../assets/utilities_icon/res.png',
      name_utilities: 'Quán ăn'
    },

    {
      id: '3',
      src: '../assets/utilities_icon/cafe.png',
      name_utilities: 'Quán cafe'
    },

    {
      id: '4',
      src: '../assets/utilities_icon/school.png',
      name_utilities: 'Nhà trẻ'
    },

    {
      id: '5',
      src: '../assets/utilities_icon/hospital.png',
      name_utilities: 'Bệnh viện'
    },

    {
      id: '6',
      src: '../assets/utilities_icon/cinema.png',
      name_utilities: 'Rạp phim'
    },

    {
      id: '7',
      src: '../assets/utilities_icon/pool.png',
      name_utilities: 'Hồ bơi'
    },

    {
      id: '8',
      src: '../assets/utilities_icon/tennis.png',
      name_utilities: 'Sân tennis'
    },

    {
      id: '9',
      src: '../assets/utilities_icon/golf.png',
      name_utilities: 'Sân golf'
    }
  ],

  APARTMENT_UTIILITES: [{
      id: '1',
      src: '../assets/utilities_icon/super.png',
      name_utilities: 'Siêu thị'
    },

    {
      id: '2',
      src: '../assets/utilities_icon/res.png',
      name_utilities: 'Quán ăn'
    },

    {
      id: '3',
      src: '../assets/utilities_icon/cafe.png',
      name_utilities: 'Quán cafe'
    },

    {
      id: '4',
      src: '../assets/utilities_icon/school.png',
      name_utilities: 'Nhà trẻ'
    },

    {
      id: '5',
      src: '../assets/utilities_icon/cinema.png',
      name_utilities: 'Rạp phim'
    },

    {
      id: '6',
      src: '../assets/utilities_icon/bbq.png',
      name_utilities: 'BBQ'
    },

    {
      id: '7',
      src: '../assets/utilities_icon/pool.png',
      name_utilities: 'Hồ bơi'
    },

    {
      id: '8',
      src: '../assets/utilities_icon/tennis.png',
      name_utilities: 'Sân tennis'
    },

    {
      id: '9',
      src: '../assets/utilities_icon/weightlifting.png',
      name_utilities: 'Gym'
    },

    {
      id: '10',
      src: '../assets/utilities_icon/cleaning-service.png',
      name_utilities: 'Dọn nhà'
    },

    {
      id: '11',
      src: '../assets/utilities_icon/emergency-exit.png',
      name_utilities: 'Thoát hiểm'
    },

    {
      id: '12',
      src: '../assets/utilities_icon/elevator.png',
      name_utilities: 'Thang máy'
    }
  ],

  GENDER: {
    0: {
      val: 0,
      name: "Chưa xác định"
    },
    1: {
      val: 1,
      name: "Nam"
    },
    2: {
      val: 2,
      name: "Nữ"
    }
  },

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
})
