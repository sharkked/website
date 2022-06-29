export interface DisplayLink {
  name: string,
  url: string
}

export enum MessageType {
  Chat = 0,
  System = 1
}

export interface ChatMessage {
  id: number,
  name: string,
  message: string,
  type: MessageType
}

export interface Profile {
	id: string;
	provider: string;
	emails: string[];
	name: string | undefined;
	username: string | undefined;
	url: string | undefined;
	createdAt: Date | undefined;
	suspended: boolean | undefined;
}