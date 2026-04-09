import { Request, Response } from "express";
import { PerifericoService } from "./periferico.service";

export class PerifericoController {
    private service = new PerifericoService();

    async listAll(req: Request, res: Response) {
        const departments = await this.service.getAllPerifericos();
        return res.json(departments);
    }

    async create(req: Request, res: Response) {  
        const {nome} = req.body;
        const newDept = await this.service.createPeriferico(nome);
        return res.status(201).json(newDept);
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const peri = await this.service.getPerifericoById(id as string);
        return peri ? res.json(peri) : res.status(404).json({ message: "Não encontrado" });
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {nome} = req.body;
        const update = await this.service.updatePeriferico(id as string, nome);
        return res.json(update);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        await this.service.deletePeriferico(id as string);
        return res.status(204).send();
    }
}