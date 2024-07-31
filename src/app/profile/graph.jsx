import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GitHubRepoGraph = () => {
  const [username, setUsername] = useState('');
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepoData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }
      const data = await response.json();
      const processedData = data.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        size: repo.size
      }));
      setRepoData(processedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchRepoData();
    }
  };

  return (
    <Card className="w-1/2 max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>GitHub Repository Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
          </Button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {repoData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={repoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="stars" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="left" type="monotone" dataKey="forks" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="size" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubRepoGraph;