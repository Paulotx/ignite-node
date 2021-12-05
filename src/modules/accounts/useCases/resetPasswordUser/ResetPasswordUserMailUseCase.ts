import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByRefreshToken(
            token,
        );

        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow(),
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.save(user);

        await this.userTokensRepository.deleteById(userToken.id);
    }
}

export default ResetPasswordUserMailUseCase;
