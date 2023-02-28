declare module 'express-serve-static-core' {
  export interface Request {
    data: Record<string, unknown>;
    session: Record<string, Record<string, string | number>>;
  }
}

export {};
