import { prisma } from "../../lib/prisma";

export class PerifericoRepository{

    async findAll() {
        return await prisma.periferico.findMany({
            include: {
                computador: true
            }
        });
    }

    async create(data: {nome: string; computadorid: string}) {
        return await prisma.periferico.create({data});
    }

    async findById(id: string) {
        return await prisma.periferico.findUnique({
            where: {id},
            include: {computador: true}
        });
    }

    async update(id: string, data: {nome: string; computadorid: string}) {
        return await prisma.periferico.update({where: {id}, data});
    }

    async delete(id: string) {
        return await prisma.periferico.delete({where: {id}});
    }
    
}