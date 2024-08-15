import { UserProps, User } from '@/user/domain/user.entity';

export interface UserRepository {
  create: (params: Pick<UserProps, 'birthDate' | 'email' | 'name'>) => Promise<User>;

  findOneByEmail: (email: string) => Promise<User | null>;
}
