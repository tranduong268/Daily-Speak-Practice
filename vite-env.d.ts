declare namespace NodeJS {
  interface Process {
    cwd(): string;
  }
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
