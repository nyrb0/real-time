export interface IParamsChannel {
  room: string;
  name: string;
  owner?: boolean;
  socketId?: string;
}

export interface IUserMessageData {
  message: string;
  user: { name: string };
}
