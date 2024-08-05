import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  arbitrumSepolia,
  polygonAmoy,
  fuseSparknet,
  fuse,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Staked Habit',
  projectId: '178ecb78e886dc2dac027f6ba7adf146',
  chains: [
    fuseSparknet,
    fuse,
    sepolia,
    arbitrumSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [arbitrumSepolia, sepolia] : []),
  ],
  ssr: true,
});
