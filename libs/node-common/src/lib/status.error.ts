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
    super(`Unauthorized`, 401);
  }
}

export class ForbiddenError extends StatusError {
  constructor() {
    super(`Forbidden`, 403);
  }
}

export class ConflictError extends StatusError {
  constructor(id: string | number = '???') {
    super(`Resource with id ${id} already exists`, 409);
  }
}

export class RangeError extends StatusError {
  constructor() {
    super(`Value out of range`, 416);
  }
}
