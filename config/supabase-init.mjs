// import dotenv from 'dotenv';
// dotenv.config();
import './loadenv.js';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPA_URL;
const supabaseKey = process.env.SUPA_KEY;

export default createClient(supabaseUrl, supabaseKey);
