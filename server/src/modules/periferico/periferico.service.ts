import { PerifericoRepository } from "./periferico.repository";

export class PerifericoService {
    private repository = new PerifericoRepository();

    async getAllPerifericos() {
        return await this.repository.findAll();
    }

    async createPeriferico(data: {nome: string; computadorid: string;}) {
        return await this.repository.create(data);
    }

    async getPerifericoById(id: string) {
        return await this.repository.findById(id);
    }

    async updatePeriferico(id: string, data: {nome: string; computadorid: string;}) {
        return await this.repository.update(id, data);
    }

    async deletePeriferico(id: string) {
        return await this.repository.delete(id);
    }

}