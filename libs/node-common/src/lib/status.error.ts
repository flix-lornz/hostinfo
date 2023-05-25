export class StatusError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export class NotFoundError extends StatusError {
  constructor(id: string | number = '???') {
    super(`Resource with id '${id}' not found`, 404);
  }
}

export class BadRequestError extends StatusError {
  constructor() {
    super(`Request is malformed`, 400);
  }
}

export class UnauthorizedError extends StatusError {
  constructor() {
    super(`Request is malformed`, 401);
  }
}

export class ForbiddenError extends StatusError {
  constructor() {
    super(`Request is malformed`, 403);
  }
}
