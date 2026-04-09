import { PerifericoRepository } from "./periferico.repository";

export class PerifericoService {
    private repository = new PerifericoRepository();

    async getAllPerifericos() {
        return await this.repository.findAll();
    }

    async createPeriferico(data: {nome: string; computadorId: string;}) {
        const id = crypto.randomUUID();
        return await this.repository.create({id, ...data});
    }

    async getPerifericoById(id: string) {
        return await this.repository.findById(id);
    }

    async updatePeriferico(id: string, data: {nome: string; computadorId: string;}) {
        return await this.repository.update(id, data);
    }

    async deletePeriferico(id: string) {
        return await this.repository.delete(id);
    }

}