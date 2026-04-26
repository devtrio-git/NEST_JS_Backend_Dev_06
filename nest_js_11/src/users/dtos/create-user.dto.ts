import {IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(96)
    @MinLength(4)
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @MaxLength(96)
    @MinLength(4)
    @IsOptional()
    lastName?:string;

    @IsNotEmpty()
    @MaxLength(96)
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(96)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message:"Password incorrect!",
    })
    password:string;
}

