import { injectable } from 'inversify';
import { User } from '@/user/domain/user.entity';
import { UserRepository } from '@/user/domain/user.repository';
import { Entity } from '@/shared/domain/entity';

@injectable()
export class MemoryUserRepository implements UserRepository {
  users: User[] = [];

  create(params: Pick<User, 'birthDate' | 'email' | 'name'>): Promise<User> {
    const user = new User({
      id: Entity.generateId(),
      createdAt: new Date(),
      birthDate: params.birthDate,
      email: params.email,
      name: params.name,
    });

    this.users.push(user);

    return Promise.resolve(user);
  }

  findOneByEmail(email: string) {
    const result = this.users.find((el) => el.email === email);
    return Promise.resolve(result || null);
  }
}
