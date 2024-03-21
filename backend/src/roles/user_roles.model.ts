import {Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "../users/users.model";
import {Role} from "./roles.model";

@Entity()
export class UserRoles {

    @PrimaryColumn()
    userId: string

    @PrimaryColumn()
    roleId: string

    @ManyToOne(() => User, user => user.roles, {  })
    @JoinColumn({ name: "userId" })
    user: User

    @ManyToOne(() => Role, role => role.users, {  })
    @JoinColumn({ name: "roleId" })
    role: Role
}