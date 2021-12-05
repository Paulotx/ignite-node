import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import UserTokens from "@modules/accounts/infra/typeorm/entities/UserTokens";

import IUserTokensRepository from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token,
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            ut => ut.user_id === user_id && ut.refresh_token === refresh_token,
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(ut => ut.id === id);

        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            ut => ut.refresh_token === refresh_token,
        );

        return userToken;
    }
}

export default UserTokensRepositoryInMemory;
