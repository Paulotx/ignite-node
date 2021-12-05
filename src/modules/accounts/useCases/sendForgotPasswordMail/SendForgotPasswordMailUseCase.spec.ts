import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UserTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            name: "User",
            email: "user@test.com",
            password: "1234",
            driver_license: "242321",
        });

        await sendForgotPasswordMailUseCase.execute("user@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("non-exists@test.com"),
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should not be able to create an user token", async () => {
        const generateTokenEmail = spyOn(
            userTokensRepositoryInMemory,
            "create",
        );

        await usersRepositoryInMemory.create({
            name: "User",
            email: "user@test.com",
            password: "1234",
            driver_license: "242321",
        });

        await sendForgotPasswordMailUseCase.execute("user@test.com");

        expect(generateTokenEmail).toBeCalled();
    });
});
