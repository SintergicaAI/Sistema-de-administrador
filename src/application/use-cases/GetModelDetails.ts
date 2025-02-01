import {ModelRepository} from "../../domain/repositories/ModelRepository.ts";
import {Model} from "../../domain/entities/Model.ts";

export class GetModelDetails {
    constructor(private modelRepository: ModelRepository) {
    }

    async execute(id: string | undefined): Promise<Model> {
        return await this.modelRepository.getModelById(id);
    }
}