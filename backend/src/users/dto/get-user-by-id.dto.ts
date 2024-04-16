import {ApiProperty} from "@nestjs/swagger";

export class GetUserByIdDto {

    @ApiProperty({example: "4134-s4df-323", description: "user id"})
    readonly userId: string
}