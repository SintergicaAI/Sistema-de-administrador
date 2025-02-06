import {ModelRepository} from "../../domain/repositories/ModelRepository.ts";
import {Model} from "../../domain/entities/Model.ts";

export class GetAllModels {
    constructor(private modelRepository: ModelRepository) {
    }

    async execute(): Promise<Model[]> {
        return await this.modelRepository.getAllModels();
    }
}