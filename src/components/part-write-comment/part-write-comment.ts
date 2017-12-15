import {
  Component,
  Input,
} from '@angular/core';

import {
  Validators,
  FormBuilder,
} from '@angular/forms';

import { FormService } from '../../providers/form.service';
import { CONSTANT } from '../../providers/constant.service';
import { WriteCommentService } from '../../providers/write-comment.service';

import { Events } from 'ionic-angular';
import * as _ from 'lodash';

import {
  ClickNeedShowLoginClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "part-write-comment",
  templateUrl: "./part-write-comment.html"
})
export class PartWriteComment extends ClickNeedShowLoginClass {

  @Input()
  commentAbout;

  @Input()
  belongToUser;

  @Input()
  typeName;

  @Input()
  parentCommentId;

  constructor(
    coreServices: CoreServices,
    private events: Events,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private writeCommentService: WriteCommentService,
  ) {
    super(coreServices);
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.WRITE_COMMENT;
    this.toggleSubscribeSendComment(true);
  }

  commentForm;
  canSend;
  canClear;
  formValidation = CONSTANT.FORM_VALIDATION;
  currentTypeId;

  toggleSubscribeSendComment(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.COMMENT_CHANGED,
        this._handleSubscribeSendComment
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.COMMENT_CHANGED,
        this._handleSubscribeSendComment
      );
    }
  }

  private _handleSubscribeSendComment = () => {
    this.clearComment();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes) {
    if (!this.currentTypeId) {
      let tempObj = _.find(CONSTANT.SERVER.TYPE_COMMENT, {
        name: this.typeName
      })
      this.currentTypeId = tempObj && tempObj.id;
    }
  }

  buildForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [
        Validators.required,
        this.formService.minCommentValue,
      ]],
    })

    this.commentForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.checkCanSend();
  }

  checkCanSend() {
    if (this.hasInternet === false) {
      this.canSend = false;
      return;
    }
    if (this.commentForm &&
      this.commentForm.value.comment.length > 0) {
      this.canClear = true;
    } else {
      this.canClear = false;
    }
    if (this.commentForm &&
      this.commentForm.valid) {
      this.canSend = true;
    } else {
      this.canSend = false;
    }
  }

  sendCommentFunc() {
    if (!this.canGo()) {
      return;
    }

    this.checkHasLogined(this.callbackType, () => {
      this.toggleIsProcessing(true);
      this.setWriteCommentData();
      this.doSendComment();
    }, () => {
      this.setWriteCommentData();
      this.finishLoading();
    })
  }

  setWriteCommentData() {
    let commentAboutId = this.commentAbout.id;
    if (this.currentTypeId === CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_RENTING.id) {
      commentAboutId = this.commentAbout.renting.id
    }
    this.writeCommentService.setWriteCommentData(
      commentAboutId,
      this.parentCommentId,
      this.commentForm && this.commentForm.value.comment,
      this.belongToUser,
      this.currentTypeId,
      this.canSend
    )
  }

  doSendComment() {
    this.writeCommentService.doSendComment(() => {
      this.toggleIsProcessing(false);
    })
  }

  clearComment() {
    if (!this.commentForm) {
      return;
    }
    let newVal = this.commentForm.value || {};
    newVal.comment = '';
    this.commentForm.setValue(newVal);
  }


  ngOnDestroy() {
    this.toggleSubscribeSendComment(false);
    super.ngOnDestroy();
  }
}
