import dotenv from 'dotenv';
dotenv.config();

import supabase from '../supabase.js';
import errorHandler from '../utils/errorHandler.mjs';

export const getUsers = async () => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE).select('*');

  if (error) errorHandler({ err: error, name: 'helpers/database.js getUsers()' });

  return { data, error };
};

export const getUser = async (opt) => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE).select('*').match(opt);

  if (error) errorHandler({ err: error, name: 'helpers/database.js getUser()' });

  return { data, error };
};

export const updateUser = async ({ chat_id, row }) => {
  const { data, error } = await supabase
    .from(process.env.SUPA_TABLE)
    .update(row)
    .eq('chat_id', chat_id);

  if (error) errorHandler({ err: error, name: 'helpers/database.js updateUser()' });

  return { data, error };
};

export const addUser = async ({ chat_id, type, follow = false }) => {
  const { data, error } = await supabase.from(process.env.SUPA_TABLE).insert([
    {
      chat_id: chat_id.toString(),
      type: type ? type.toString() : undefined,
      follow,
    },
  ]);

  if (error) errorHandler({ err: error, name: 'helpers/database.js addUser()' });

  return { data, error };
};

export const getAdmin = async () => {
  let { data, error } = await supabase
    .from(process.env.SUPA_TABLE)
    .select('*')
    .match({ type: 'admin' });

  if (error) errorHandler({ err: error, name: 'helpers/database.js getAdmin()' });

  return { data, error };
};

export const getConfig = async () => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE_CONFIG).select('*');

  if (error) errorHandler({ err: error, name: 'helpers/database.js getConfig()' });

  return { data, error };
};
