import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true })
  walletAddress :  string;

  @Prop({default: false})
  isAccountActivated : boolean
}

export const UserSchema = SchemaFactory.createForClass(User);