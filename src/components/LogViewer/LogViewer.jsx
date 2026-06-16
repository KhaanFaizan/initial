import React, { useEffect, useState } from 'react';

export default function LogViewer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/page2/partners/log.txt', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load log: ' + res.status + ' ' + res.statusText);
        const t = await res.text();
        if (!cancelled) setText(t);
      } catch (e) {
        if (!cancelled) setError(String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="max-w-4xl mx-auto my-8 p-4 bg-white/80 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Partners log</h3>
      {loading && <div className="text-sm text-gray-600">Loading log...</div>}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}
      {!loading && !error && (
        <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}} className="text-sm text-gray-800">{text}</pre>
      )}
    </section>
  );
}
