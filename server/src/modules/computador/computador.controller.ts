import { Request, Response } from "express";
import { ComputadorService } from "./computador.service";

export class ComputadorController {
    private service = new ComputadorService();

    async listAll(req: Request, res: Response) {
        const computadores = await this.service.getAllComputadores();
        return res.json(computadores);
    }

    async create(req: Request, res: Response) {  
        const {nome, cor, datafabricacao} = req.body;
        const result = await this.service.createComputador(nome, cor, datafabricacao);
        return res.status(201).json(result);
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const comp = await this.service.getComputadorById(id as string);
        return comp ? res.json(comp) : res.status(404).json({ message: "Não encontrado." });
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {nome, cor, datafabricacao} = req.body;
        const update = await this.service.updateComputador(id as string, nome, cor, datafabricacao);
        return res.json(update);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        await this.service.deleteComputador(id as string);
        return res.status(204).send();
    }
}