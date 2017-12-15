var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { CONSTANT } from './constant.service';
import { PushService } from './push.service';
import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';
import { LoadingService } from './loading.service';
import { Events } from 'ionic-angular';
var LoginService = (function () {
    function LoginService(pushService, anywhereService, userStorageService, fb, gg, loadingService, events) {
        this.pushService = pushService;
        this.anywhereService = anywhereService;
        this.userStorageService = userStorageService;
        this.fb = fb;
        this.gg = gg;
        this.loadingService = loadingService;
        this.events = events;
    }
    LoginService.prototype.loginByUserPassword = function (data) {
        var _this = this;
        var path = CONSTANT.SERVER.APIS.LOGIN;
        return this.anywhereService.makePostRequest(path, data)
            .then(function (res) {
            return _this.loginSuccess(res);
        }, function (err) {
            return _this.loginError(-1, err);
        });
    };
    LoginService.prototype.loginSocial = function (data) {
        var path = CONSTANT.SERVER.APIS.LOGIN_FACEBOOK;
        return this.anywhereService.makePostRequest(path, data);
    };
    LoginService.prototype.loginFacebook = function () {
        var _this = this;
        return this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', res);
            return _this.callBackLoginFB(res);
        }, function (err) {
            return _this.loginError(-1, err);
        });
    };
    LoginService.prototype.callBackLoginFB = function (response) {
        var _this = this;
        if (response.status === 'connected') {
            var requestPath = '/me?fields=email,name,id&access_token=' + response.authResponse.accessToken;
            return this.fb.api(requestPath, null)
                .then(function (user) {
                console.log("useruseruseruseruseruser", user);
                var userData = {
                    social_network_id: user.id,
                    social_network_name: 'Facebook',
                    display_name: user.name,
                    email: user.email,
                    picture: 'http://graph.facebook.com/' + user.id + '/picture'
                };
                return _this.sendLoginDataToServer(userData);
            }, function (err) {
                return _this.loginError(-1, err);
            });
        }
        else {
            return this.loginError(-1, 'cai trang thai login k phai la connected');
        }
    };
    LoginService.prototype.loginGoogle = function () {
        var _this = this;
        return this.gg.login({})
            .then(function (res) {
            console.log('Logged into Google!', res);
            return _this.callBackLoginGG(res);
        }, function (err) {
            return _this.loginError(-1, err);
        });
    };
    LoginService.prototype.callBackLoginGG = function (response) {
        var user = response;
        console.log("useruseruseruseruseruser", user);
        var userData = {
            social_network_id: user.userId,
            social_network_name: 'Google',
            display_name: user.displayName,
            email: user.email,
            picture: user.imageUrl || ''
        };
        return this.sendLoginDataToServer(userData);
    };
    LoginService.prototype.sendLoginDataToServer = function (data) {
        var _this = this;
        return this.loginSocial(data)
            .then(function (res) {
            var type = data.social_network_name;
            return _this.loginSuccess(res, type);
        }, function (err) {
            return _this.loginError(-1, err);
        });
    };
    LoginService.prototype.loginSuccess = function (res, type) {
        var _this = this;
        console.log("loginSuccessloginSuccessloginSuccess", res);
        if (res.reason == CONSTANT.REASONS.ER_OK) {
            console.log("i am onnnnnnnnnnnnn");
            var data = res.user;
            return this.userStorageService.setLoginedUser(data, type)
                .then(function (result) {
                console.log("resultresultresult", result);
                if (result.logined) {
                    _this.pushService.registerPushNotification();
                    setTimeout(function () {
                        _this.events.publish(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, result);
                    }, 1);
                    console.log('return 1return 1return 1return 1');
                    var msg = CONSTANT.LOGIN.SUCCESS + _this.anywhereService.USER.userInfo.name;
                    _this.anywhereService.showToast(msg);
                    return 1;
                }
                console.log('return ------------------1');
                return _this.loginError(-1);
            }, function (err) {
                console.log('return ------------------1 eeeeeeee');
                return _this.loginError(-1, CONSTANT.ERR_GENERAL);
            });
        }
        else {
            console.log('return 000000000000000000 eeeeeeee');
            return this.loginError(0);
        }
    };
    // -1: err
    // 0: !ERR_OK
    LoginService.prototype.loginError = function (errCode, message) {
        this.anywhereService.showAlert(message);
        return errCode;
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        console.log("logoutlogoutlogoutlogoutlogoutlogout");
        this.loadingService.toggleLoading(true);
        if (this.userStorageService.getProp('loginType') == "Facebook") {
            console.log("FacebookFacebookFacebook");
            this.fb.logout().then(function (res) {
                console.log("da logout khoi facebook");
            });
        }
        else if (this.userStorageService.getProp('loginType') == "Google") {
            console.log("gggggggggggggggggooooooooo");
            this.gg.logout()
                .then(function (res) {
                console.log("da logout khoi google");
            });
        }
        this.pushService.unregisterPushNotification();
        this.userStorageService.setLogouted()
            .then(function (res) {
            console.log("da hoan toan outttttttttt", res);
            _this.loadingService.toggleLoading(false);
            _this.events.publish(CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS, res);
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PushService,
        AnywhereService,
        UserStorageService,
        Facebook,
        GooglePlus,
        LoadingService,
        Events])
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map