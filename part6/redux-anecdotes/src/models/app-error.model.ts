export class AppError extends Error {
  constructor(public data: any) {
    super(data.message);
  }
}
