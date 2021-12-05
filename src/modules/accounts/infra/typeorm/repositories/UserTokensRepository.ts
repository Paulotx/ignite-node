import { getRepository, Repository } from "typeorm";

import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";

import UserTokens from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const user_token = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        await this.repository.save(user_token);

        return user_token;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return usersTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne({ refresh_token });

        return userToken;
    }
}

export default UserTokensRepository;
