import { prisma } from "../../lib/prisma";

export class ComputadorRepository{

    async findAll() {
        return await prisma.computador.findMany();
    }

    async create(data: {id: string; nome: string; cor: string; datafabricacao: number}) {
        return await prisma.computador.create({data});
    }

    async findById(id: string) {
        return await prisma.computador.findUnique({where: {id}});
    }

    async update(id: string, data: {nome: string; cor: string, datafabricacao: number}) {
        return await prisma.computador.update({where: {id}, data});
    }

    async delete(id: string) {
        return await prisma.computador.delete({where: {id}});
    }
    
}