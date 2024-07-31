import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GitHubCommitHistoryGraph = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommitData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/repos/gulshanpr/${repo}/commits`);
      if (!response.ok) {
        throw new Error('Failed to fetch commit data');
      }
      const data = await response.json();
      let totalLinesOfCode = 0;
      const processedData = await Promise.all(data.map(async (commit, index) => {
        const detailResponse = await fetch(commit.url);
        const detailData = await detailResponse.json();
        const additions = detailData.stats.additions || 0;
        const deletions = detailData.stats.deletions || 0;
        totalLinesOfCode += additions - deletions;
        return {
          date: new Date(commit.commit.author.date).toLocaleDateString(),
          commits: data.length - index,
          linesOfCode: totalLinesOfCode
        };
      }));
      setCommitData(processedData.reverse());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      fetchCommitData();
    }
  };

  return (
    <Card className="w-1/2 max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>GitHub Commit History and Lines of Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <Input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-grow"
          />
          <Input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Enter repository name"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
          </Button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {commitData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={commitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="commits" fill="#8884d8" stroke="#8884d8" />
              <Area yAxisId="right" type="monotone" dataKey="linesOfCode" fill="#82ca9d" stroke="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubCommitHistoryGraph;