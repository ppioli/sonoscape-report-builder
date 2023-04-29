export interface ConfigData {
  masterDir: string;
}

export function defaultConfig(): ConfigData {
  return {
    masterDir: '',
  };
}
