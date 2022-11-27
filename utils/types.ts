export type OptionalFieldsOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

export type OptionalOf<T extends object> = Pick<T, OptionalFieldsOf<T>>;

export interface ICommitsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: {
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
}

export interface IRepositoryResponse {
  data: {
    user: {
      repositories: { nodes: IRepository[] };
    };
  };
}

export interface IRepository {
  name: string;
  languages: {
    edges: { size: number }[];
    nodes: {
      name: string;
      color: string;
    }[];
  };
}

export interface ILanguage {
  name: string;
  color: string;
  codes: number;
  sticker: string;
}
