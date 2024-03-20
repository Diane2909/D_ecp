// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export enum Interest {
//   MakeFriends = 'MAKE FRIENDS',
//   MakeSex = 'MAKE SEX',
//   FindLove = 'FIND LOVE',
// }

// export enum LookingFor {
//   Women = 'WOMEN',
//   Men = 'MEN',
//   Both = 'BOTH',
// }

// export enum AgeRange {
//   Range18_25 = '18-25',
//   Range20_35 = '20-35',
//   Range30_55 = '30-55',
//   Range40_60 = '40-60',
// }

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop({ required: true })
//   role: string;

//   @Prop({ required: true })
//   username: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   email: string;

//   @Prop({ enum: Interest, type: String })
//   interest: Interest;

//   @Prop({ enum: LookingFor, type: [String] })
//   wantToMeet: LookingFor[];

//   @Prop({ type: String, enum: ['18-25', '20-35', '30-55', '40-60'] })
//   ageRange: string;

//   @Prop()
//   location: string;

//   @Prop()
//   distanceRange: number;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
