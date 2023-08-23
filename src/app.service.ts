import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const key = {
      Public:
        'BMoP0EIzWpCYwTHfLjxlpPUpxzy9IsbnIaDQvL6gByrAzO2LsdpW1opBa8l740bOhqnYji1Kq6y-5_-Ckq7LERo',

      Private: '9fIQ5QrOruMloP-5m9xvXEEAU1_ooQ-CKbRcoC7sklI',
    };
    return 'Hello World!';
  }
}
