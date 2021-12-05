import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const {
            secret_refresh_token,
            expires_in_refresh_token,
            expires_in_refresh_token_days,
        } = auth;
        const { sub, email } = verify(token, secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken =
            await this.userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token,
            );

        if (!userToken) {
            throw new AppError("Refresh Token does note exists!");
        }

        await this.userTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            expires_in_refresh_token_days,
        );

        await this.userTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}

export default RefreshTokenUseCase;
