import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./roles.model";
import {Repository} from "typeorm";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role)
                private roleRepository: Repository<Role>) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        const savedRole = await this.roleRepository.save(role)
        return savedRole
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }


}
