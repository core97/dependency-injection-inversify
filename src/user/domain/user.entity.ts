import { Entity } from '@/shared/domain/entity';

export type UserProps = ConstructorParameters<typeof User>[0];

export class User extends Entity {
  id: string;

  birthDate: Date;

  email: string;

  name: string;

  constructor(params: Pick<User, 'birthDate' | 'createdAt' | 'email' | 'id' | 'name'>) {
    super(params);
    this.id = params.id;
    this.birthDate = params.birthDate;
    this.email = params.email;
    this.name = params.name;
  }

  calculateAge() {
    const currentDate = new Date();

    let age = currentDate.getFullYear() - this.birthDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthMonth = this.birthDate.getMonth();
    const birthDay = this.birthDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }

    return age;
  }
}
