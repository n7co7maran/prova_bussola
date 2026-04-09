import { prisma } from "../../lib/prisma";

export class PerifericoRepository{

    async findAll() {
        return await prisma.periferico.findMany();
    }

    async create(data: {id: string; nome: string;}) {
        return await prisma.periferico.create({data});
    }

    async findById(id: string) {
        return await prisma.periferico.findUnique({where: {id}});
    }

    async update(id: string, data: {nome: string; cor: string, dataFabricacao: number}) {
        return await prisma.periferico.update({where: {id}, data});
    }

    async delete(id: string) {
        return await prisma.periferico.delete({where: {id}});
    }
    
}