import { ComputadorRepository } from "../computador/computador.repository"

export class ComputadorService {

    private repository = new ComputadorRepository();

    async getAllComputadores() {
        return await this.repository.findAll();
    }

    async createComputador(nome: string, cor: string, dataFabricacao: number) {
        const id = crypto.randomUUID();
        return await this.repository.create({id, nome, cor, dataFabricacao});
    }

    async getComputadorById(id: string) {
        return await this.repository.findById(id);
    }

    async updateComputador(id: string, nome: string, cor: string, dataFabricacao: number) {
        return await this.repository.update(id, {nome, cor, dataFabricacao});
    }

    async deleteComputador(id: string) {
        return await this.repository.delete(id);
    }
}