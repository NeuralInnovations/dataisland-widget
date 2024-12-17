import { DataIslandApp } from '@neuralinnovations/dataisland-sdk';
import { ChatModel } from '../../types';

export const getCurrentOrgId = (sdk: DataIslandApp | null) => {
  return sdk?.organizations.current ?? '';
};

export const createChat = async (sdk: DataIslandApp | null) => {
  if (!sdk) {
    throw new Error('no sdk!');
  }

  const currentOrgId = getCurrentOrgId(sdk);
  const chat = await sdk?.organizations
    .get(currentOrgId)
    .chats.create(ChatModel.Dataisland, '');
  return chat || null;
};

export const deleteChat = async (sdk: DataIslandApp | null, chatId: string) => {
  if (!sdk) {
    throw new Error('no sdk!');
  }

  const currentOrgId = getCurrentOrgId(sdk);
  await sdk?.organizations.get(currentOrgId).chats.delete(chatId);
};

export const getChats = (sdk: DataIslandApp | null) => {
  const currentOrgId = sdk?.organizations?.current ?? '';

  if (currentOrgId) {
    return sdk?.organizations.get(currentOrgId)?.chats.collection;
  } else {
    throw new Error('no OrgId!');
  }
};
