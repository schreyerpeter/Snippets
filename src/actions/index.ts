'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // Simple validation
    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }
    if (typeof code !== 'string' || code.length < 3) {
      return {
        message: 'Code must be longer',
      };
    }

    // Create a new record in db
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    // Do not throw inside of server actions, just return something
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }

  revalidatePath('/');
  // Redirect to home page
  // Redirect cannot be inside try/catch because it throws NEXT_REDIRECT to redirect
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  revalidatePath('/');
  redirect('/');
}
