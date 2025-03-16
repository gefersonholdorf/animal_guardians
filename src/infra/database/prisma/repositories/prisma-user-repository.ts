import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/report/application/repositories/user-repository";
import { User } from "src/domain/report/enterprises/entities/user";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.create({
            data
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async save(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)
        
        if(!data.id) {
            throw new Error()
        }

        await this.prisma.user.update({
            where: {
                id: data.id
            },
            data
        })
    }
}