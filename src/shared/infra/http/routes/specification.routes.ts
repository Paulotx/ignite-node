import { Router } from "express";

import CreateSpecificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle,
);

// specificationsRoutes.get("/", (request, response) => {
//     const all = categoriesRepository.list();

//     return response.json(all);
// });

export default specificationsRoutes;
