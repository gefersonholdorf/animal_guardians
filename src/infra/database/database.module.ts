import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/report/application/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { ComplaintRepository } from "src/domain/report/application/repositories/complaint-repository";
import { PrismaComplaintRepository } from "./prisma/repositories/prisma-complaint-repository";

@Module({
    providers: [PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: ComplaintRepository,
            useClass: PrismaComplaintRepository
        }
    ],
    exports: [PrismaService, UserRepository, ComplaintRepository]
})
export class DatabaseModule{}