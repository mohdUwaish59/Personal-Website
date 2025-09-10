'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function WeeklyReview() {
  const [topics, setTopics] = useState('');
  const [score, setScore] = useState('');
  const [notes, setNotes] = useState('');

  async function submitReview() {
    await addDoc(collection(db, 'weekly_reviews'), {
      topics,
      score,
      notes,
      date: new Date().toISOString().split('T')[0]
    });
    setTopics(''); setScore(''); setNotes('');
    alert('Review submitted!');
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔁 Weekly Review</h2>
      <textarea
        placeholder="Topics revised"
        value={topics}
        onChange={e => setTopics(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Test Score (e.g. 65/90)"
        value={score}
        onChange={e => setScore(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <textarea
        placeholder="Reflection / Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <button onClick={submitReview} className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Weekly Review
      </button>
    </div>
  );
}
