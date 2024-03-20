// import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
// import { Interest, LookingFor } from './user.schema';

// export class PreferencesDto {
//   @IsEnum(Interest)
//   interest: Interest;

//   @IsEnum(LookingFor, { each: true })
//   lookingFor: LookingFor[];

//   @IsString()
//   ageRange: string;

//   @IsString()
//   location: string;

//   @IsInt()
//   @Min(1)
//   @Max(1000)
//   distanceRange: number;
// }
