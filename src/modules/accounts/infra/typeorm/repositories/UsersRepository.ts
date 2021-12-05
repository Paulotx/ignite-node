import { getRepository, Repository } from "typeorm";

import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUserRepository from "@modules/accounts/repositories/IUserRepository";

import User from "../entities/User";

class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
        });

        await this.repository.save(user);
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export default UsersRepository;
