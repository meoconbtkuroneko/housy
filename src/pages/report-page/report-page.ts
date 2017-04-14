import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  ViewController,
  NavParams,
} from 'ionic-angular';

import * as _ from 'lodash';

import { PostService } from '../../services/post.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
import { CONSTANT } from '../../services/constant.service';

@Component({
  selector: 'report-page',
  templateUrl: 'report-page.html'
})
export class ReportPage {
  private loginForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private formService: FormService,
    private navParams: NavParams,
  ) {};

  stringValidations = CONSTANT.FORM_VALIDATION;
  formErrors: any;
  isDisabled: boolean = true;
  canSend: boolean;

  params;
  title;
  subTitle;
  feedbacks;
  highlightFeedback: any = {
    reason: CONSTANT.USER_FEEDBACK.NO_REASON
  };

  ngOnInit() {
    this.initVals();
    this.buildForm();
  }

  initVals() {
    this.params = this.navParams.get('params');
    this.title = CONSTANT.USER_FEEDBACK.TITLE;
    this.subTitle = CONSTANT.USER_FEEDBACK.SUB_TITLE;
    this.feedbacks = CONSTANT.SERVER.FEEDBACK_USER_VAL;
    this.highlightFeedback.reason = CONSTANT.USER_FEEDBACK.NO_INFO;

    if (this.params.type === 'space') {
      this.title = CONSTANT.SPACE_FEEDBACK.TITLE;
      this.subTitle = CONSTANT.SPACE_FEEDBACK.SUB_TITLE;
      this.feedbacks = CONSTANT.SERVER.FEEDBACK_SPACE_VAL;
      this.highlightFeedback.reason = CONSTANT.SPACE_FEEDBACK.NO_INFO;
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      feedback: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      feedback_string: ['', [
        Validators.required,
      ]],
    })

    this.loginForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.formErrors = this.formService.onValueChanged(this.loginForm);
    console.log("this.formErrorsthis.formErrors", this.formErrors, this.loginForm);
    let valsObj = this.loginForm.value;
    for (let i in valsObj) {
      console.log("aaaaaaaaaaaaaaaaaaaaa", valsObj[i]);
      if (valsObj[i] || valsObj[i] !== '') {
        this.canSend = true;
        console.log("this.canSend", this.canSend);
        break;
      }
    }
    if (valsObj.feedback === this.feedbacks[1].id + '') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }





  // isHighlighted() {
  //   console.log("this.feedback", this.feedback)
  //   if (this.feedback.val || this.feedback.val === 0) {
  //     console.log("1111111111111111111111")
  //     if (this..val == this.feedbacks['1'].id) {
  //       delete this.highlightFeedback.reason;
  //       return false;
  //     }

  //     if (this.feedback.val == this.feedbacks['2'].id) {
  //       if (this.feedback.valStrings &&
  //         this.feedback.valStrings.trim().length > 0) {
  //         delete this.highlightFeedback.reason;
  //         return false;
  //       } else {
  //         this.highlightFeedback.highlight = true;
  //         this.highlightFeedback.reason = CONSTANT.USER_FEEDBACK.NO_REASON;
  //         if (this.params.type == 'space') {
  //           this.highlightFeedback.reason = CONSTANT.SPACE_FEEDBACK.NO_REASON;
  //         }
  //       }
  //     }
  //     return true;
  //   } else {
  //     this.highlightFeedback.reason = CONSTANT.USER_FEEDBACK.NO_INFO;
  //     if (this.params.type == 'space') {
  //       this.highlightFeedback.reason = CONSTANT.SPACE_FEEDBACK.NO_INFO;
  //     }
  //     return true;
  //   }
  // }



  // import {
  //   Component,
  //   Input,
  // } from '@angular/core';
  // import {
  //   NavController,
  //   AlertController,
  //   Events,
  //   ViewController,
  //   NavParams
  // } from 'ionic-angular';

  // import { Validators, FormBuilder, FormGroup } from '@angular/forms';

  // import * as _ from 'lodash';

  // import { AnywhereService } from '../../services/anywhere.service';
  // import { PostService } from '../../services/post.service';
  // import { ReportService } from '../../services/report.service';
  // import { LoginPage } from '../../pages/login-page/login-page';
  // import { FormService } from '../../services/form.service';
  // import { CONSTANT } from '../../services/constant.service';


  // import { UserStorageService } from '../../services/user-storage.service';
  // import { LoadingService } from '../../services/loading.service';
  // import { LoginService } from '../../services/login.service';
  // import { RegisterPage } from '../register-page/register-page';
  // import { ForgetPassword } from '../forget-password/forget-password';

  // @Component({
  //   selector: "report-page",
  //   templateUrl: "./report-page.html"
  // })
  // export class ReportPage {
  //   constructor(
  //     private navController: NavController,
  //     private anywhereService: AnywhereService,
  //     private postService: PostService,
  //     private events: Events,
  //     public alertController: AlertController,
  //     public reportService: ReportService,
  //     public viewController: ViewController,
  //     public navParams: NavParams,
  //     private formBuilder: FormBuilder,
  //     private loginForm: FormGroup,
  //     private loginService: LoginService,
  //     private userStorageService: UserStorageService,
  //     private loadingService: LoadingService,
  //     private formService: FormService,
  //   ) {}

  //   params;

  //   stringValidations = CONSTANT.FORM_VALIDATION;
  //   formErrors: any;


  //   timeToFinishCall = 30000;
  //   highlightFeedback: any = {};
  //   feedback: any = {
  //     val: undefined,
  //     valStrings: undefined,
  //   };

  //   hostInfo;
  //   feedbacks;
  //   title;
  //   subTitle;
  //   report;

  //   ngOnInit() {
  //     this.initVals()
  //     this.buildForm();
  //   }

  //   sendReport() {
  //     let isHighlighted = this.isHighlighted();
  //     console.log("isHighlightedisHighlighted", isHighlighted);
  //   }


  //   handleClick(res) {
  //     if (res) {
  //       let data: any = {};
  //       if (this.params.type === 'space') {
  //         data.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_RENTING;
  //         data.object_id = this.params.data.renting.id;
  //       } else {
  //         data.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_USER;
  //         data.object_id = this.params.data.id;
  //       }
  //       data.reason = res.val;
  //       if (res.valStrings) {
  //         data.note = res.valStrings;
  //       }
  //       this.postService.sendUserFeedback(data);
  //     }
  //     // delete $localStorage.contactHostClicked;
  //     // delete $localStorage.hostInfo;
  //   }

  //   isHighlighted() {
  //     console.log("this.feedback", this.feedback)
  //     if (this.feedback.val || this.feedback.val === 0) {
  //       console.log("1111111111111111111111")
  //       if (this.feedback.val == this.feedbacks['1'].id) {
  //         delete this.highlightFeedback.reason;
  //         return false;
  //       }

  //       if (this.feedback.val == this.feedbacks['2'].id) {
  //         if (this.feedback.valStrings &&
  //           this.feedback.valStrings.trim().length > 0) {
  //           delete this.highlightFeedback.reason;
  //           return false;
  //         } else {
  //           this.highlightFeedback.highlight = true;
  //           this.highlightFeedback.reason = CONSTANT.USER_FEEDBACK.NO_REASON;
  //           if (this.params.type == 'space') {
  //             this.highlightFeedback.reason = CONSTANT.SPACE_FEEDBACK.NO_REASON;
  //           }
  //         }
  //       }
  //       return true;
  //     } else {
  //       this.highlightFeedback.reason = CONSTANT.USER_FEEDBACK.NO_INFO;
  //       if (this.params.type == 'space') {
  //         this.highlightFeedback.reason = CONSTANT.SPACE_FEEDBACK.NO_INFO;
  //       }
  //       return true;
  //     }
  //   }

  //   // checkContactTime() {
  //   //   let contactInfo = this.reportService.CONTACT_HOST_INFO;
  //   //   if (contactInfo && contactInfo.timeContact) {
  //   //     let nowTime = new Date().getTime();
  //   //     let callingTime = nowTime - contactInfo.timeContact;
  //   //     console.log("nowTime - $localStorage.timeContact", callingTime);
  //   //     if (callingTime > this.timeToFinishCall) {
  //   //       // this.createReport();
  //   //     }
  //   //     // delete $localStorage.timeContact;
  //   //   }
  //   // }
  //   closeModal() {
  //       this.viewController.dismiss();
  //     }
  //     // this.$watchCollection('feedback', function(newVal, oldVal) {
  //     //     if (newVal) {
  //     //         if (newVal.val || newVal.val === 0) {
  //     //             this.highlightFeedback = {};
  //     //         }

  //   //         if (newVal.val == this.feedbacks['1'].id) {
  //   //             delete this.feedback.valStrings;
  //   //         }
  //   //     }
  //   // });


}
