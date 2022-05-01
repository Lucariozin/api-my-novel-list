import { User } from "@/domain/entities/user";
import { UsersRepository } from "@/infra/repositories/users-repository/contract-users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = [];

  async createUser(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }

  async getUserByName(name: string): Promise<User | null> {
    const user = this.users.find(user => {
      if (user.name === name) return user;
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => {
      if (user.email === email) return user;
    });

    return user;
  }
}
