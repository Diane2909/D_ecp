import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  role: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;

  @Prop()
  profileImageUrl: string;

  @Prop()
  name: string;
  @Prop()
  description: string;

  @Prop({ type: Number, min: 18, max: 100 })
  age: number;

  @Prop()
  gender: string;
  @Prop()
  interests: string;
  @Prop()
  hereTo: string;

  @Prop({ type: String, enum: ['WOMEN', 'MEN', 'BOTH'] })
  wantToMeet: string;

  @Prop({ type: String, enum: ['18-25', '20-35', '30-55', '40-60'] })
  ageRange: string;

  @Prop()
  location: string;
  picture: string;
}
export interface AuthenticatedUser {
  _id: string;
  id: string;
  role: string;
  username: string;
  password: string;
  email: string;
  profileImageUrl: string;
  name: string;
  description: string;
  age: number;
  gender: string;
  interests: string;
  hereTo: string;
  wantToMeet: string[];
  ageRange: string;
  location: string;
  
}
export const UserSchema = SchemaFactory.createForClass(User);
