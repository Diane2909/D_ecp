import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.model';
 
export type MatchDocument = Match & Document;
 
@Schema()
export class Match {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user1: Types.ObjectId;
 
  @Prop({ type: Types.ObjectId, ref: User.name })
  user2: Types.ObjectId;
}
 
export const MatchSchema = SchemaFactory.createForClass(Match);