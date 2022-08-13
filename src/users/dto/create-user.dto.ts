import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, isString, Max, MaxLength, Min, MinLength } from "class-validator";
import { USER_ROLE } from "../types/user-role.enum";

export class CreateUserDto{
    @MaxLength(50)
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(200)
    @Min(0)
    public age: number;

    @IsEnum(USER_ROLE)
    @IsNotEmpty()
    public role: USER_ROLE;

    @IsBoolean()
    public active: boolean;
}