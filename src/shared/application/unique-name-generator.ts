import { injectable } from 'inversify';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { RandomNameGenerator } from '@/shared/domain/services/random-name-generator';

@injectable()
export class UniqueNameGenerator implements RandomNameGenerator {
  generate(): string {
    const name = uniqueNamesGenerator({ dictionaries: [names] });
    return name;
  }
}
