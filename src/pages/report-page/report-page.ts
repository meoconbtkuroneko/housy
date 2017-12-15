import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ViewController,
  NavParams,
} from 'ionic-angular';

import { PostService } from '../../providers/post.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { FormService } from '../../providers/form.service';
import { CONSTANT } from '../../providers/constant.service';
import { FeedbackData } from '../../templates/feedback-data';
import { ReportService } from '../../providers/report.service';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'report-page',
  templateUrl: 'report-page.html'
})
export class ReportPage extends CoreSimpleClass {
  private feedbackForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private formService: FormService,
    public reportService: ReportService,
    private navParams: NavParams,
    coreServices: CoreServices,
  ) {
    super(coreServices);

  };

  isDisabled: boolean = true;
  canSend: boolean;

  params;
  title;
  subTitle;
  feedbacks;
  isHighLight;
  type;
  id;
  hostInfo;

  ngOnInit() {
    this.initVals();
    this.buildForm();
  }

  initVals() {
    this.params = this.navParams.get('params');
    console.log("this.params", this.params);

    if (this.params.type === 'space') {
      this.title = CONSTANT.SPACE_FEEDBACK.TITLE;
      this.subTitle = CONSTANT.SPACE_FEEDBACK.SUB_TITLE;
      this.feedbacks = CONSTANT.SERVER.FEEDBACK_SPACE_VAL;
      this.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_RENTING;
      this.id = this.params.data.renting.id;
    } else {
      this.title = CONSTANT.USER_FEEDBACK.TITLE;
      this.subTitle = CONSTANT.USER_FEEDBACK.SUB_TITLE;
      this.feedbacks = CONSTANT.SERVER.FEEDBACK_USER_VAL;
      this.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_USER;
      this.id = this.params.data.id;
      this.hostInfo = this.reportService.CONTACT_HOST_INFO;
    }
  }

  buildForm() {
    this.feedbackForm = this.formBuilder.group({
      feedback: ['',
        Validators.required,
      ],
      feedback_string: ['', [
        Validators.compose([
          Validators.required,
          this.formService.notEmptyValidation
        ])
      ]],
    })

    this.feedbackForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    let valsObj = this.feedbackForm.value;
    let otherReason = '' + CONSTANT.SERVER.TYPE_REPORT_REASON.REPORT_REASON_OTHER;
    this.canSend = false;
    this.isHighLight = false;
    if (valsObj.feedback !== otherReason) {
      if (valsObj.feedback != '') {
        this.canSend = true;
      }
    } else {
      if (valsObj.feedback_string && valsObj.feedback_string.trim().length > 0) {
        this.canSend = true;
      } else {
        this.isHighLight = true;
      }
    }

    if (valsObj.feedback === otherReason) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  sendReport() {
    if (!this.canGo()) {
      return;
    }
    let data = new FeedbackData(
      this.type,
      this.id,
      this.feedbackForm.value.feedback,
      this.feedbackForm.value.feedback_string
    );
    this.postService.sendUserFeedback(data);
    this.closeModal();
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
