import { InMemoryUsersRepository } from '@/infra/repositories/users-repository/implementations/in-memory-users-repository';
import { UserDto } from '@/modules/users/dto/user-dto';
import { CreateUserUseCase } from '@/modules/users/usecases/create-user-usecase';

describe('Create user use case', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should create a user successfully', async () => {
    const data: UserDto = {
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: 'lucas123'
    };

    expect.assertions(1);

    try {
      const user = await createUserUseCase.execute(data);
      expect(user.name).toBe(data.name);
    } catch {}
  });

  it('should not create a user that already exists', () => {
    const data: UserDto = {
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: 'lucas123'
    };

    expect(async () => {
      await createUserUseCase.execute(data);
      await createUserUseCase.execute(data);
    }).rejects.toThrow('User already exists.');
  });

  it('should not create a user when passing invalid password', () => {
    const data: UserDto = {
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: ''
    };

    expect(async () => {
      await createUserUseCase.execute(data);
    }).rejects.toThrow('The password must be longer than 6 characters.');
  });
});
