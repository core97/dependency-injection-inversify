import { Container } from 'inversify';
import { UserRepository } from '@/user/domain/user.repository';
import { MemoryUserRepository } from '@/user/infra/memory-user.repository';
import { UserService } from '@/user/application/user.service';
import { RandomNameGenerator } from '@/shared/domain/services/random-name-generator';
import { UniqueNameGenerator } from '@/shared/application/unique-name-generator';

export class DIContainer {
  container: Container;

  constructor() {
    this.container = new Container();
    this.configure();
  }

  private configure() {
    this.loadRepositories();
    this.loadServices();
  }

  private loadRepositories() {
    this.container
      .bind<UserRepository>('UserRepository')
      .to(MemoryUserRepository)
      .inSingletonScope();
  }

  private loadServices() {
    this.container.bind<UserService>(UserService).toSelf().inSingletonScope();
    this.container
      .bind<RandomNameGenerator>('RandomNameGenerator')
      .to(UniqueNameGenerator)
      .inSingletonScope();
  }
}
