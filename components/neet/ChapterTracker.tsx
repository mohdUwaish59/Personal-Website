'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function ChapterTracker() {
  const [chapters, setChapters] = useState<any[]>([]);
  const statusOptions = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    getDocs(collection(db, 'chapters')).then(snapshot => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setChapters(data);
    });
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    await updateDoc(doc(db, 'chapters', id), { status: newStatus });
    setChapters(prev => prev.map(ch => (ch.id === id ? { ...ch, status: newStatus } : ch)));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📚 Chapter Scheduler</h2>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Chapter</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map(ch => (
            <tr key={ch.id} className="border-b">
              <td className="p-2 border">{ch.subject}</td>
              <td className="p-2 border">{ch.class}</td>
              <td className="p-2 border">{ch.name}</td>
              <td className="p-2 border">
                <select
                  value={ch.status}
                  onChange={(e) => updateStatus(ch.id, e.target.value)}
                  className="border rounded px-2"
                >
                  {statusOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
