import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvailableCarsUserCase from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsUserCase = container.resolve(
            ListAvailableCarsUserCase,
        );

        const cars = await listAvailableCarsUserCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });

        return response.json(cars);
    }
}

export default ListAvailableCarsController;
