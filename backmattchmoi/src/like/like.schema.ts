import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.model';


export type LikeDocument = Like & Document;

@Schema()
export class Like extends Document {
  @Prop()
  fromUser: string;

  @Prop()
  toUser: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
