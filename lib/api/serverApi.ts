import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};



export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};


export const fetchNoteById = async (id: string) => {
    const cookieStore = await cookies();
    const res = await nextServer.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  
    return res;
  };