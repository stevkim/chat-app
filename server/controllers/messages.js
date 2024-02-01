import db from '../db/db.js';

export const addMessage = async (message) => {
  try {
    const { error } = await db
      .from('messages')
      .insert(message);

    if (error) {
      throw error;
    }
  } catch(error) {
    return { message: 'Whoops, internal server error'};
  }
}

export const getMessagesFromRoom = async (room) => {
  try {
    const { data, error } = await db
      .from('messages')
      .select()
      .eq('room', room)
      .order('timestamp', { ascending: true })
      .limit(50)

    if (error) {
      throw error;
    }
    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}