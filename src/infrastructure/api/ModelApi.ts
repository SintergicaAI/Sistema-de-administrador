import {ModelRepository} from "../../domain/repositories/ModelRepository.ts";
import {Model} from "../../domain/entities/Model.ts";
import {User} from "../../domain/entities/User.ts";

export class ModelApi implements ModelRepository {
    private readonly baseUrl = "http://localhost:3000/models";

    async getAllModels(): Promise<Model[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data.map(((model: {
            id: string;
            name: string;
            description: string;
            image: string;
            author: User;
            isActive: boolean;
        }) => new Model(model.id, model.name, model.description, model.image, model.author, model.isActive)))

    }

    async getModelById(id: string): Promise<Model> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        const user = new User(data.author.id, data.author.first_name, data.author.last_name, data.author.password, data.author.email, data.author.role);
        return new Model(data.id, data.name, data.description, data.image, user, data.isActive);
    }
}