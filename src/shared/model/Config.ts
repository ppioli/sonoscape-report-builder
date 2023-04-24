export interface Config {
  masterDir: string;
}

export function defaultConfig(): Config {
  return {
    masterDir: '',
  };
}
