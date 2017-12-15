export class UserSetting {
  constructor(
    notification_email ? : boolean,
    promotion_email ? : boolean,
    push_notification ? : boolean
  ) {
    this.notification_email = notification_email;
    this.promotion_email = promotion_email;
    this.push_notification = push_notification;
  };

  notification_email: boolean;
  promotion_email: boolean;
  push_notification: boolean;
}
