'use client';
import { useState } from 'react';
import ChapterTracker from '@/components/neet/ChapterTracker';
import MCQLogger from '@/components/neet/MCQLogger';
import WeeklyReview from '@/components/neet/WeeklyReview';
import StatsDashboard from '@/components/neet/StatsDashboard';

const tabs = ['Chapter Tracker', 'MCQ Log', 'Weekly Review', 'Stats'];

export default function NeetTrackerPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🧠 NEET 2026 Prep Dashboard</h1>

      {/* Tab Menu */}
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              idx === activeTab ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-4">
        {activeTab === 0 && <ChapterTracker />}
        {activeTab === 1 && <MCQLogger />}
        {activeTab === 2 && <WeeklyReview />}
        {activeTab === 3 && <StatsDashboard />}
      </div>
    </div>
  );
}
