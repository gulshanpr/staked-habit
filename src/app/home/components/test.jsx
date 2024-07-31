const fetchLatestCommit = async (username) => {
    try {
      // Fetch the user's repositories
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
  
      if (!repoResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
  
      const repos = await repoResponse.json();
      console.log('User repositories:', repos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };
  
  // Example usage
  const username = 'gulshanpr';
  fetchLatestCommit(username);
  
  