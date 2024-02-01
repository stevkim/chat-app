import db from '../db/db.js';

export const getAllRooms = async () => {
  try {
    const { data, error } = await db
      .from('rooms')
      .select()

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}