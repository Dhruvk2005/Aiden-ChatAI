"use client";

import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeResume = async () => {
    if (!resume) return;
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          AI Resume Reviewer
        </h1>
        <p className="text-gray-400 mb-6">
          Paste your resume and get instant AI feedback
        </p>

        <textarea
          className="w-full h-48 p-4 bg-gray-900 border border-gray-700 rounded-lg"
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button
          onClick={analyzeResume}
          className="mt-4 px-6 py-3 bg-white text-black rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="text-xl font-semibold">
              Resume Score: {result.score}/100
            </div>

            <Section title="Strengths" items={result.strengths} />
            <Section title="Weaknesses" items={result.weaknesses} />
            <Section title="Suggestions" items={result.improvement_suggestions} />

            <div>
              <h3 className="font-semibold mb-2">Improved Summary</h3>
              <p className="text-gray-300">{result.improved_summary}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Section({ title, items }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="list-disc pl-5 text-gray-300">
        {items?.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
