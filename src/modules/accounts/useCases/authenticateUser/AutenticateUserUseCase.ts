import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRespository } from "../../repositories/IUsersRespository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AutenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRespository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "78e5b0f92fcb174b9ea58300b0402286", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}

export { AutenticateUserUseCase };
