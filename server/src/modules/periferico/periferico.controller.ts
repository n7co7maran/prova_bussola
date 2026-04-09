import { Request, Response } from "express";
import { PerifericoService } from "./periferico.service";

export class PerifericoController {
    private service = new PerifericoService();

    async listAll(req: Request, res: Response) {
        const perifericos = await this.service.getAllPerifericos();
        return res.json(perifericos);
    }

    async create(req: Request, res: Response) {  
        const {nome, computadorid} = req.body;
        const result = await this.service.createPeriferico({nome, computadorid});
        return res.status(201).json(result);
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const peri = await this.service.getPerifericoById(id as string);
        return peri ? res.json(peri) : res.status(404).json({ message: "Não encontrado" });
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {nome, computadorid} = req.body;
        const update = await this.service.updatePeriferico(id as string, {nome, computadorid});
        return res.json(update);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        await this.service.deletePeriferico(id as string);
        return res.status(204).send();
    }
}