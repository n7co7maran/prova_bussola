import { ComputadorRepository } from "../computador/computador.repository"

export class ComputadorService {

    private repository = new ComputadorRepository();

    async getAllComputadores() {
        return await this.repository.findAll();
    }

    async createComputador(nome: string, cor: string, datafabricacao: number) {
        const id = crypto.randomUUID();
        return await this.repository.create({id, nome, cor, datafabricacao});
    }

    async getComputadorById(id: string) {
        return await this.repository.findById(id);
    }

    async updateComputador(id: string, nome: string, cor: string, datafabricacao: number) {
        return await this.repository.update(id, {nome, cor, datafabricacao});
    }

    async deleteComputador(id: string) {
        return await this.repository.delete(id);
    }
}