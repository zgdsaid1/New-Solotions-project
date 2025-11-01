import mongoose, { Document, Schema } from 'mongoose';

// Interface for a single message
export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Interface for the chat session document
export interface IChatSession extends Document {
  userId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Message schema
const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Chat session schema
const ChatSessionSchema = new Schema<IChatSession>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  messages: {
    type: [MessageSchema],
    default: []
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create indexes for better query performance
ChatSessionSchema.index({ userId: 1, createdAt: -1 });

export const ChatSession = mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);