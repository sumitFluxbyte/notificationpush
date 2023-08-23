import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as webpush from 'web-push';
interface SubscriptionData {
  // Define the properties you expect in the subscription data
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  options = {
    vapidDetails: {
      subject: 'mailto:harshit@clevertap.com',
      publicKey:
        'BMoP0EIzWpCYwTHfLjxlpPUpxzy9IsbnIaDQvL6gByrAzO2LsdpW1opBa8l740bOhqnYji1Kq6y-5_-Ckq7LERo',
      privateKey: '9fIQ5QrOruMloP-5m9xvXEEAU1_ooQ-CKbRcoC7sklI',
    },
    TTL: 60,
  };

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async sendNotification(@Body() data: SubscriptionData): Promise<any> {
    const subscription = data;
    console.log('subscription', data);
    if (subscription) {
      return this.sendPushNotification(subscription);
    }
  }
  private sendPushNotification(subscription) {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      'BMoP0EIzWpCYwTHfLjxlpPUpxzy9IsbnIaDQvL6gByrAzO2LsdpW1opBa8l740bOhqnYji1Kq6y-5_-Ckq7LERo',
      '9fIQ5QrOruMloP-5m9xvXEEAU1_ooQ-CKbRcoC7sklI',
    );
    setTimeout(() => {
      webpush
        .sendNotification(
          subscription,
          JSON.stringify({
            notification: {
              title: 'Our first push notification',
              body: 'Here you can add some text',
            },
          }),
        )
        .then((log) => {
          console.log('Push notification sent.');
          console.log(log);
        })
        .catch((error) => {
          console.log({ error });
        });
    }, 5000);
  }
}
