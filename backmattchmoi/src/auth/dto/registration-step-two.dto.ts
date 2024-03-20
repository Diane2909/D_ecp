import {
  IsString,
  // IsISO8601,
  // ValidateIf,
  IsNotEmpty,
  IsIn,
  // IsNumber,
  Min,
  Max,
  IsInt,
} from 'class-validator';
// import { IsOptional, IsString, IsDate, IsISO8601, ValidateIf } from 'class-validator';
export class RegistrationStepTwoDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
  @IsNotEmpty({ message: 'Le genre est obligatoire.' })
  @IsIn(['MEN', 'WOMEN'], {
    message: 'Le genre doit être "homme" ou "femme".',
  })
  readonly gender: string;
}
