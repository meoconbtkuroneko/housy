import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { CONSTANT } from './constant.service';
import { PushService } from './push.service';
import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';
import { LoadingService } from './loading.service';

import { Events } from 'ionic-angular';

@Injectable()
export class LoginService {
  constructor(
    private pushService: PushService,
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private fb: Facebook,
    private gg: GooglePlus,
    public loadingService: LoadingService,
    public events: Events,
  ) {}

  loginByUserPassword(data) {
    let path = CONSTANT.SERVER.APIS.LOGIN;
    return this.anywhereService.makePostRequest(path, data)
      .then(res => {
          return this.loginSuccess(res);
        },
        err => {
          return this.loginError(-1, CONSTANT.LOGIN.ERR);
        });
  }

  loginSocial(data) {
    let path = CONSTANT.SERVER.APIS.LOGIN_FACEBOOK;
    return this.anywhereService.makePostRequest(path, data);
  }

  loginFacebook() {
    return this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res)
        return this.callBackLoginFB(res);
      }, err => {
        console.log("loginFacebook", err);
        return this.loginError(-1, CONSTANT.LOGIN.ERR);
      })
  }

  callBackLoginFB(response) {
    if (response.status === 'connected') {
      let requestPath = '/me?fields=email,name,id&access_token=' + response.authResponse.accessToken;
      return this.fb.api(requestPath, null)
        .then(user => {
            console.log("useruseruseruseruseruser", user);
            let userData = {
              social_network_id: user.id,
              social_network_name: 'Facebook',
              display_name: user.name,
              email: user.email,
              picture: 'http://graph.facebook.com/' + user.id + '/picture'
            };
            return this.sendLoginDataToServer(userData);
          },
          err => {
            console.log("callBackLoginFB", err);
            return this.loginError(-1, CONSTANT.LOGIN.ERR);
          })
    } else {
      return this.loginError(-1, CONSTANT.LOGIN.ERR);
    }
  }

  loginGoogle() {
    return this.gg.login({})
      .then((res: any) => {
        console.log('Logged into Google!', res)
        return this.callBackLoginGG(res);
      }, err => {
        console.log("loginGoogle", err);
        return this.loginError(-1, CONSTANT.LOGIN.ERR);
      })
  }

  callBackLoginGG(response) {
    let user = response;
    console.log("useruseruseruseruseruser", user);
    let userData = {
      social_network_id: user.userId,
      social_network_name: 'Google',
      display_name: user.displayName,
      email: user.email,
      picture: user.imageUrl || ''
    };
    return this.sendLoginDataToServer(userData);
  }

  sendLoginDataToServer(data) {
    return this.loginSocial(data)
      .then(res => {
        let type = data.social_network_name;
        return this.loginSuccess(res, type);
      }, err => {
        console.log("sendLoginDataToServer", err);
        return this.loginError(-1, CONSTANT.LOGIN.ERR);
      });
  }

  loginSuccess(res, type ? ) {
    console.log("loginSuccessloginSuccessloginSuccess", res);
    switch (res.reason) {
      case CONSTANT.REASONS.ER_OK:
        {
          console.log("i am onnnnnnnnnnnnn")
          let data = res.user;
          return this.userStorageService.setLoginedUser(data, type)
            .then((result: any) => {
              console.log("resultresultresult", result);
              if (result.logined) {
                this.pushService.registerPushNotification();
                setTimeout(() => {
                  this.events.publish(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, result);
                }, 1);
                console.log('return 1return 1return 1return 1')
                let msg = CONSTANT.LOGIN.SUCCESS + this.anywhereService.USER.userInfo.name;
                this.anywhereService.showToast(msg);
                return 1;
              }
              console.log('return ------------------1')
              return this.loginError(-1, CONSTANT.LOGIN.ERR);
            }, err => {
              console.log('return ------------------1 eeeeeeee')
              return this.loginError(-1, CONSTANT.LOGIN.ERR);
            });
        }

      case CONSTANT.REASONS.ER_USER_INVALID_USERNAME:
      case CONSTANT.REASONS.ER_USER_INVALID_USERNAME_OR_PASSWORD:
        {
          return this.loginError(0, CONSTANT.LOGIN.NOT_ACTIVE);
        }

      default:
        {
          return this.loginError(-1, CONSTANT.LOGIN.ERR);
        }
    }
  }

  // -1: err
  // 0: !ERR_OK
  loginError(errCode, message ? ) {
    console.log("loginErrorloginError", message);
    this.anywhereService.showAlert(message);
    return errCode;
  }

  logout() {
    console.log("logoutlogoutlogoutlogoutlogoutlogout")
    this.loadingService.toggleLoading(true);

    if (this.userStorageService.getProp('loginType') == "Facebook") {
      console.log("FacebookFacebookFacebook");
      this.fb.logout().then(res => {
        console.log("da logout khoi facebook");
      });
    } else if (this.userStorageService.getProp('loginType') == "Google") {
      console.log("gggggggggggggggggooooooooo");
      this.gg.logout()
        .then(res => {
          console.log("da logout khoi google");
        });
    }
    this.pushService.unregisterPushNotification();
    this.userStorageService.setLogouted()
      .then(res => {
        console.log("da hoan toan outttttttttt", res);
        this.loadingService.toggleLoading(false);
        this.events.publish(CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS, res);
      });
  }
}
