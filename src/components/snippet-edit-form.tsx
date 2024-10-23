'use client';

import Editor from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import { editSnippet } from '@/actions';

interface SnippetEditFormProps {
  readonly snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <form action={editSnippetAction}>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <button className="p-2 border rounded" type="submit">
        Save
      </button>
    </form>
  );
}
