import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";

import IUserRepository from "../IUserRepository";

class UsersRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);
    }

    async save(user: User): Promise<void> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
}

export default UsersRepositoryInMemory;
