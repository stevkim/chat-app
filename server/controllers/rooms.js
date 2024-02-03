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

export const getCurrentRoom = async (name) => {
  try {
    const { data, error } = await db
      .from('current-room')
      .select('room')
      .eq('user', name)
      .limit(1);


    if (error) {
      throw error;
    }

    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateCurrentRoom = async ({ name, room }) => {
  try {
    const { error } = await db
      .from('current-room')
      .update({ room })
      .eq('user', name)

    if (error) {
      throw error
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const setCurrentRoom = async({ name, room }) => {
  try {
    const { error } = await db
      .from('current-room')
      .insert({ user: name, room })

      if (error) {
        throw error;
      }
  } catch (error) {
    console.log(error);
    return null;
  }
}