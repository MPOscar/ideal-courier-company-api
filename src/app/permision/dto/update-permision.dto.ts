import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class UpdatePermisionDto {
    @IsString()   
    readonly name: string;

    @IsString()   
    readonly description: string;  
}