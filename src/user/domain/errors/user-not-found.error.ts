import { AppException } from '@/shared/domain/app-exception';

export namespace NotFoundUser {
  export class ByEmail extends AppException {
    constructor(message: string) {
      super({ message, name: 'NotFoundUser_ByEmail' });
    }
  }
}
