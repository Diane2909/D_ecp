import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class RegistrationStepThreeDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'Au moins un intérêt doit être sélectionné' })
  @IsString({ each: true })
  interests: string[];
}
