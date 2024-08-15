export class AppException extends Error {
  constructor(params: Pick<AppException, 'cause' | 'message' | 'name'>) {
    super(params.message, { cause: params.cause });
    this.name = params.name;
  }
}
