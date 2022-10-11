import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "3958145772",
      email: "giagpoj@kuj.in",
      name: "Ruth Cannon",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("giagpoj@kuj.in");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => [
    await expect(
      sendForgotPasswordMailUseCase.execute("asdf@vj.gr")
    ).rejects.toEqual(new AppError("User does not exists!")),
  ]);

  it("shoud be able to create an user token", async () => {
    const generateToneMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "166187",
      email: "siah@zijimoc.gt",
      name: "Katie Matthews",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("siah@zijimoc.gt");

    expect(generateToneMail).toBeCalled();
  });
});
