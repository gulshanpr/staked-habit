import React, { useState, useEffect } from 'react';
import { isAllowed, setAllowed, getUserInfo } from '@stellar/freighter-api';

const FreighterComponent: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const getPk = async (): Promise<string | null> => {
    try {
      const { publicKey } = await getUserInfo();
      return publicKey;
    } catch (error) {
      console.error('Error getting public key:', error);
      return null;
    }
  };

  const handleConnect = async () => {
    try {
      await setAllowed();
      const pk = await getPk();
      if (pk) setPublicKey(pk);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  useEffect(() => {
    const checkFreighterStatus = async () => {
      if (await isAllowed()) {
        const pk = await getPk();
        if (pk) {
          setPublicKey(pk);
        } else {
          setIsLocked(true);
        }
      }
    };

    checkFreighterStatus();
  }, []);

  if (isLocked) {
    return <div>Freighter is locked.<br/>Sign in & refresh the page.</div>;
  }

  if (publicKey) {
    return (
      <div id="freighter-wrap">
        <div className="ellipsis" title={publicKey}>
          Signed in as {publicKey}
        </div>
      </div>
    );
  }

  return (
    <div id="freighter-wrap">
      <button onClick={handleConnect} disabled={!!publicKey}>
        Connect to Freighter
      </button>
    </div>
  );
};

export default FreighterComponent;