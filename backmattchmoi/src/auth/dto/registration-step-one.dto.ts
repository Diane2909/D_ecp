import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: "L'adresse e-mail doit être valide" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères',
  })
  readonly password: string;
}
