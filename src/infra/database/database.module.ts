import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/report/application/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";

@Module({
    providers: [PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [PrismaService, UserRepository]
})
export class DatabaseModule{}