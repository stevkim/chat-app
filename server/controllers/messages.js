import db from './db/db.js';

export const addMessage = async (message) => {
  const { error } = await db
    .from('messages')
    .insert(message);

  if (error) {
    return error;
  }
}

export const getMessagesFromRoom = async (room) => {
  const { data, error } = await db
    .from('messages');
    .select()
    .eq('room', room)
    .order('date', { ascending: false })
    .limit(50)

  if (error) {
    return error;
  }

  return data;
}