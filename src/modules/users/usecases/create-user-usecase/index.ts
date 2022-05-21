import { User } from '@/domain/entities/user';
import { UserDto } from '@/modules/users/dtos/user-dto';
import { UsersRepository } from '@/infra/repositories/users-repository/contract-users-repository';

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password }: UserDto): Promise<User> {
    if (password.length < 6) {
      throw new Error('The password must be longer than 6 characters.');
    }

    const [thereIsUserWithTheSameName, thereIsUserWithTheSameEmail] = await Promise.all([
      this.usersRepository.getUserByName(name),
      this.usersRepository.getUserByEmail(email)
    ]);

    if (thereIsUserWithTheSameName || thereIsUserWithTheSameEmail) {
      throw new Error('User already exists.');
    }

    const user = new User({ name, email, password });

    await this.usersRepository.createUser(user);

    return user;
  }
}
