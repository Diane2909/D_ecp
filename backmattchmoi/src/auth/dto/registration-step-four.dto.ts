import {
  IsString,
  IsIn,
  // IsInt,
  // Min,
  // Max,
  // ValidateIf,
  // IsOptional,
} from 'class-validator';
export class RegistrationStepFourDto {
  @IsString()
  @IsIn(['FRIENDS', 'LOVE', 'BOTH'], {
    message: 'Le choix doit être parmi FRIENDS, LOVE, ou BOTH',
  })
  hereTo: string;
  @IsString({ each: true })
  @IsIn(['WOMEN', 'MEN', 'BOTH'], {
    message: 'Le choix doit être parmi WOMEN, MEN, ou BOTH',
    each: true,
  })
  wantToMeet: string;

  @IsString()
  @IsIn(['18-25', '20-35', '30-55', '40-60'], {
    message: 'La plage d’âge doit être parmi les valeurs prédéfinies',
  })
  ageRange: string;
  @IsString()
  readonly location: string;
}
