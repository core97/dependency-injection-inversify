import 'reflect-metadata';
import { UserService } from '@/user/application/user.service';
import { DIContainer } from '@/inversify.config';

const diContainer = new DIContainer();

const userService = diContainer.container.get(UserService);

async function main() {
  const userCreated = await userService.create({
    email: 'pepe@gmail.com',
    birthDate: new Date('1997-01-10'),
  });

  const user = await userService.getByEmailOrTrhow(userCreated.email);

  console.log(`${user.name} tiene ${user.calculateAge()} años`);

  return user;
}

main().then(console.log).catch(console.error);
