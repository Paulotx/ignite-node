import ICreateCategoryDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import ISpecificationsRepository from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            specification => specification.name === name,
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(specification =>
            ids.includes(specification.id),
        );

        return allSpecifications;
    }
}

export default SpecificationsRepositoryInMemory;
