import { User } from '@/domain/entities/user';

export interface UsersRepository {
  createUser: (data: User) => Promise<User>;
  getUserByName: (name: string) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
}
