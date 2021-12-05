import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    save(user: User): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export default IUserRepository;
