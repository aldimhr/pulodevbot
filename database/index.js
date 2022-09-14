require('dotenv').config();

const supabase = require('../supabase.js');
const errorHandler = require('../utils/errorHandler.js');

exports.getUsers = async () => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE).select('*');

  if (error) errorHandler({ err: error, name: 'helpers/database.js getUsers()' });

  return { data, error };
};

exports.getUser = async (opt) => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE).select('*').match(opt);

  if (error) errorHandler({ err: error, name: 'helpers/database.js getUser()' });

  return { data, error };
};

exports.updateUser = async ({ chat_id, row }) => {
  const { data, error } = await supabase
    .from(process.env.SUPA_TABLE)
    .update(row)
    .eq('chat_id', chat_id);

  if (error) errorHandler({ err: error, name: 'helpers/database.js updateUser()' });

  return { data, error };
};

exports.addUser = async ({ chat_id, type, follow = false }) => {
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

exports.getAdmin = async () => {
  let { data, error } = await supabase
    .from(process.env.SUPA_TABLE)
    .select('*')
    .match({ type: 'admin' });

  if (error) errorHandler({ err: error, name: 'helpers/database.js getAdmin()' });

  return { data, error };
};

exports.getConfig = async () => {
  let { data, error } = await supabase.from(process.env.SUPA_TABLE_CONFIG).select('*');

  if (error) errorHandler({ err: error, name: 'helpers/database.js getConfig()' });

  return { data, error };
};
