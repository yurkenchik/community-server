import {ApiProperty} from "@nestjs/swagger";

export class GetCommentByIdDto {

    @ApiProperty({example: "423dp-423ddf-32432ds", description: "comment id"})
    readonly commentId: string
}