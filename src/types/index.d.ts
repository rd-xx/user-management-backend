declare module 'express' {
  export interface Request {
    data: Record<string, unknown>;
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    data: Record<string, unknown>;
  }
}

export {};
