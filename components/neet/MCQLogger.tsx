'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function MCQLogger() {
  const [chapter, setChapter] = useState('');
  const [correct, setCorrect] = useState('');
  const [wrong, setWrong] = useState('');

  async function logMCQs() {
    if (!chapter || !correct || !wrong) return;
    const correctNum = parseInt(correct);
    const wrongNum = parseInt(wrong);
    const total = correctNum + wrongNum;
    const accuracy = Math.round((correctNum / total) * 100);

    await addDoc(collection(db, 'mcqs'), {
      chapter,
      correct: correctNum,
      wrong: wrongNum,
      accuracy,
      date: new Date().toISOString().split('T')[0],
    });

    setChapter('');
    setCorrect('');
    setWrong('');
    alert('Logged successfully!');
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📝 MCQ Log</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Chapter Name"
          value={chapter}
          onChange={e => setChapter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Correct"
          value={correct}
          onChange={e => setCorrect(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Wrong"
          value={wrong}
          onChange={e => setWrong(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={logMCQs}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Log Practice
      </button>
    </div>
  );
}
