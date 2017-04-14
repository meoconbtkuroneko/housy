import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';

@Injectable()
export class LoginService {
  constructor(
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private fb: Facebook,
    private gg: GooglePlus,
  ) {}

  loginByUserPassword(data) {
    let path = CONSTANT.SERVER.APIS.LOGIN;
    return this.anywhereService.makePostRequest(path, data)
      .then(res => {
          return this.loginSuccess(res);
        },
        err => {
          return this.loginError(-1, err);
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
        return this.loginError(-1, err);
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
            return this.loginError(-1, err);
          })
    } else {
      return this.loginError(-1, 'cai trang thai login k phai la connected');
    }
  }

  loginGoogle() {
    return this.gg.login({})
      .then((res: any) => {
        console.log('Logged into Google!', res)
        return this.callBackLoginGG(res);
      }, err => {
        return this.loginError(-1, err);
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
        return this.loginError(-1, err);
      });
  }

  loginSuccess(res, type ? ) {
    console.log("loginSuccessloginSuccessloginSuccess", res);
    if (res.reason == CONSTANT.REASONS.ER_OK) {
      let data = res.user;
      return this.userStorageService.setLoginedUser(data, type)
        .then(res => {
          if (res.logined) {
            return 1;
          }
          return this.loginError(-1);
        }, err => {
          return this.loginError(-1);
        })
    } else {
      return this.loginError(0);
    }
  }

  // -1: err
  // 0: !ERR_OK
  loginError(errCode, err ? ) {
    console.log("errerrerrerrerrerrerr", err);
    return errCode;
  }

  logout() {
    console.log("logoutlogoutlogoutlogoutlogoutlogout")
    if (this.userStorageService.getProp('loginType') == "Facebook") {
      console.log("FacebookFacebookFacebook");
      this.fb.logout().then(res => {
        console.log("da logout khoi facebook");
      });;
    } else if (this.userStorageService.getProp('loginType') == "Google") {
      console.log("gggggggggggggggggooooooooo");
      this.gg.logout()
        .then(res => {
          console.log("da logout khoi google");
        });
    }

    this.userStorageService.setLogouted()
      .then(res => {
        console.log("da hoan toan outttttttttt", res);
      });
  }
}
