import SnippetEditForm from '@/components/snippet-edit-form';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

const getSnippet = cache(async (id: string) => {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();
  return snippet;
});

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  await new Promise((r) => setTimeout(r, 1000));

  const { id } = await params;

  const snippet = await getSnippet(id);

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
