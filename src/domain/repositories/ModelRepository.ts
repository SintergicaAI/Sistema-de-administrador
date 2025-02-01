import {Model} from "../entities/Model.ts";

export interface ModelRepository {
    getModelById(id: string): Promise<Model>;
    getAllModels(): Promise<Model[]>;

}