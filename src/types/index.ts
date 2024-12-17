export interface ClientSignature {
  userId: string;
  userName: string;
  userMetadata: string;
}

export interface TokenFromKey {
  userJwtToken: string;
  authSchemaName: string;
}

export enum ChatModel {
  Dataisland = 'search',
  Gpt = 'chat',
}

export enum StorageVars {
  userId = 'dataisland-widget-userId',
}

export enum CreateChatMode {
  initial = 'initiak',
  new = 'new',
}
