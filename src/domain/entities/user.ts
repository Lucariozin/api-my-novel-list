import { randomUUID } from 'crypto';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}
