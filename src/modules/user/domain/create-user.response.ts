import { User } from './user.schema';

interface CreateUserResponse {
  user: User;
  token: string;
}

export { CreateUserResponse };
