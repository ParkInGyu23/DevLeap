interface User {
  email: string;
  username: string;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  unsetAuth: () => void;
}
