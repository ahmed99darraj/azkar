import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// نوع البيانات للأذكار
export interface Zikr {
  id: number;
  text: string;
  count: number;
  description?: string;
  category_id?: number;
}

// نوع البيانات للتصنيفات
export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

// نوع البيانات لمحطات الراديو
export interface RadioStation {
  id: number;
  name: string;
  url: string;
  description?: string;
  reciter?: string;
}
