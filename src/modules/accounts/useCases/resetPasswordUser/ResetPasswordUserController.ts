import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPasswordUserMailUseCase from "./ResetPasswordUserMailUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUserMailUseCase = container.resolve(
            ResetPasswordUserMailUseCase,
        );

        await resetPasswordUserMailUseCase.execute({
            token: String(token),
            password,
        });

        return response.send();
    }
}

export default ResetPasswordUserController;
