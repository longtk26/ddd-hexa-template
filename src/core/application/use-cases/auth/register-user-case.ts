import { Injectable } from "@nestjs/common";

@Injectable()
export class RegisterUseCase {
    async execute(userData: any): Promise<any> {}
}