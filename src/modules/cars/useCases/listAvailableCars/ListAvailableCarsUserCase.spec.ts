import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("ListAvailableCarsUserCase", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 150.0,
            license_plate: "AAA-0000",
            fine_amount: 120.0,
            brand: "Car Brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 150.0,
            license_plate: "AAA-0000",
            fine_amount: 120.0,
            brand: "Car Brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 02",
            description: "Car description",
            daily_rate: 150.0,
            license_plate: "AAA-0000",
            fine_amount: 120.0,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by Category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 02",
            description: "Car description",
            daily_rate: 150.0,
            license_plate: "AAA-0000",
            fine_amount: 120.0,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id",
        });

        expect(cars).toEqual([car]);
    });
});
