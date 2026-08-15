export interface WithdrawalProof {
  id: string;
  appName: string;
  appCategory: 'Crypto App' | 'Telegram Bot' | 'Airdrop' | 'Mining & Node' | 'Exchange';
  amount: string;
  currency: string;
  usdEquivalent: string;
  payoutMethod: string;
  txHash?: string;
  explorerUrl?: string;
  walletAddress?: string;
  proofImage: string;
  date: string;
  status: 'Verified On-Chain' | 'P2P Receipt Confirmed' | 'Instant Payout';
  trustScore: number; // 0 - 100
  userHandle: string;
  notes: string;
  earningSteps?: string[];
  appUrl: string;
  appId?: string;
  featured?: boolean;
  upvotesCount: number;
}

export const proofCategories = [
  { id: 'all', name: 'All Proofs', icon: '💎' },
  { id: 'Crypto App', name: 'Crypto Apps', icon: '📱' },
  { id: 'Telegram Bot', name: 'Telegram Bots', icon: '✈️' },
  { id: 'Airdrop', name: 'Airdrops & Testnets', icon: '⚡' },
  { id: 'Mining & Node', name: 'DePIN & Mining', icon: '💻' },
  { id: 'Exchange', name: 'Exchanges', icon: '🏦' },
] as const;

export const withdrawalProofs: WithdrawalProof[] = [
  {
    id: 'proof-grass-1',
    appName: 'Grass Network',
    appCategory: 'Mining & Node',
    amount: '420.5',
    currency: 'GRASS',
    usdEquivalent: '$1,177.40',
    payoutMethod: 'Solana (Phantom)',
    txHash: '5K3j9xPq9mLz2aK7vQ1wE4rT6yU8s7d6f5g4h3j2k1m',
    explorerUrl: 'https://solscan.io/tx/5K3j9xPq9mLz2aK7vQ1wE4rT6yU8s7d6f5g4h3j2k1m',
    walletAddress: '7xKX9qW2mLz8pQ1wE4rT6yU8s7d6f5g4',
    proofImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=80',
    date: '2025-01-28',
    status: 'Verified On-Chain',
    trustScore: 100,
    userHandle: '@cryptohustler_7',
    notes: 'Claimed Season 1 Airdrop payout directly to Phantom wallet on Solana mainnet. Swapped on Raydium DEX for instant SOL.',
    earningSteps: [
      'Connected desktop extension to Wynd DePIN network',
      'Earned Grass points continuously over 90 days',
      'Claimed 420.5 GRASS tokens on Solana mainnet launch day'
    ],
    appUrl: '/apps',
    appId: '4',
    featured: true,
    upvotesCount: 342
  },
  {
    id: 'proof-mepass-1',
    appName: 'ME PASS (MEC Token)',
    appCategory: 'Crypto App',
    amount: '6.00',
    currency: 'MEC',
    usdEquivalent: '$36.00',
    payoutMethod: 'Me Pass P2P',
    txHash: 'MEC-TX-99812450',
    walletAddress: '0x7a8123bf90c8b7',
    proofImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1000&q=80',
    date: '2025-02-09',
    status: 'P2P Receipt Confirmed',
    trustScore: 99,
    userHandle: '@mec_trader',
    notes: 'Earned 6 MEC (1 MEC ≈ $6) via daily check-in and KYC ID verification. Sold instantly via built-in P2P trading section.',
    earningSteps: [
      'Signed up using invitation code x4ccdp3m',
      'Passed Face ID verification + Me ID Passport check after 2 hours',
      'Received 1 MEC stake + 0.1 MEC instant bonus and traded on P2P'
    ],
    appUrl: '/apps',
    appId: 'mepass',
    featured: true,
    upvotesCount: 289
  },
  {
    id: 'proof-blum-1',
    appName: 'Blum Crypto Bot',
    appCategory: 'Telegram Bot',
    amount: '1,250.00',
    currency: 'USDT',
    usdEquivalent: '$1,250.00',
    payoutMethod: 'TON (Tonkeeper)',
    txHash: 'a89c2f10d45e99b01c3d8872f10b',
    explorerUrl: 'https://tonscan.org/tx/a89c2f10d45e99b01c3d8872f10b',
    walletAddress: 'EQD3k3L9p01m2n3b4v5c6x7z8a9b0c1d2e',
    proofImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&q=80',
    date: '2025-02-02',
    status: 'Verified On-Chain',
    trustScore: 100,
    userHandle: '@alex_hustles',
    notes: 'Withdrawal of referral & drop game rewards processed via Telegram TON Space wallet. High trust Binance Labs batch project.',
    earningSteps: [
      'Farmed Blum Points (BP) every 8 hours in Telegram app',
      'Played Drop Game for bonus passes',
      'Cashed out allocation directly to Tonkeeper wallet'
    ],
    appUrl: '/apps',
    appId: '3',
    featured: true,
    upvotesCount: 412
  },
  {
    id: 'proof-mpaisa-1',
    appName: 'mPaisa App',
    appCategory: 'Crypto App',
    amount: '15.00',
    currency: 'USDT / Airtime',
    usdEquivalent: '$15.00',
    payoutMethod: 'Ethio / Safaricom Airtime',
    txHash: 'MPAISA-WD-77120',
    proofImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&q=80',
    date: '2025-02-10',
    status: 'Instant Payout',
    trustScore: 98,
    userHandle: '@ethio_earner',
    notes: 'Completed mobile gaming tasks and received instant Ethio Telecom airtime / USDT payout.',
    earningSteps: [
      'Played daily mobile games inside mPaisa',
      'Accumulated coins and selected Ethio Telecom airtime withdrawal',
      'Received phone balance top-up notification in 3 minutes'
    ],
    appUrl: '/apps',
    appId: 'mpaisa',
    featured: true,
    upvotesCount: 195
  },
  {
    id: 'proof-hifami-1',
    appName: 'HiFami App',
    appCategory: 'Crypto App',
    amount: '24.50',
    currency: 'USD',
    usdEquivalent: '$24.50',
    payoutMethod: 'Instant Payout',
    txHash: 'HF-PAYOUT-33109',
    proofImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&q=80',
    date: '2025-02-10',
    status: 'Instant Payout',
    trustScore: 99,
    userHandle: '@hifami_boss',
    notes: 'Cashed out minimum $0.10 threshold instantly + referral rewards ($0.15 per referral).',
    earningSteps: [
      'Signed up and claimed $0.10 welcome reward instantly',
      'Shared invitation link with 16 friends ($0.15 each)',
      'Requested withdrawal and received funds in wallet'
    ],
    appUrl: '/apps',
    appId: 'hifami',
    featured: true,
    upvotesCount: 230
  },
  {
    id: 'proof-bybit-1',
    appName: 'Bybit Web3 Airdrop',
    appCategory: 'Exchange',
    amount: '350.00',
    currency: 'USDC',
    usdEquivalent: '$350.00',
    payoutMethod: 'Arbitrum / EVM',
    txHash: '0x94f1c281e01a89c2f10d45e99b01c3d',
    explorerUrl: 'https://arbiscan.io/tx/0x94f1c281e01a89c2f10d45e99b01c3d',
    walletAddress: '0x3Fb8817xKX9qW2mLz8pQ1wE4rT6yU',
    proofImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1000&q=80',
    date: '2025-01-20',
    status: 'Verified On-Chain',
    trustScore: 100,
    userHandle: '@pro_trader99',
    notes: 'Bybit Web3 IDO allocation distribution. Funds transferred directly to Metamask wallet on Arbitrum.',
    earningSteps: [
      'Maintained 300 USDC balance in Bybit Web3 Wallet',
      'Joined Web3 IDO subscription pool',
      'Won allocation and received direct USDC on Arbitrum'
    ],
    appUrl: '/apps',
    appId: '7',
    featured: true,
    upvotesCount: 310
  },
  {
    id: 'proof-jollycash-1',
    appName: 'Jolly Cash',
    appCategory: 'Crypto App',
    amount: '50.00',
    currency: 'USD',
    usdEquivalent: '$50.00',
    payoutMethod: 'Instant Payout',
    txHash: 'JC-CLAIM-882194',
    proofImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=80',
    date: '2025-02-09',
    status: 'Instant Payout',
    trustScore: 97,
    userHandle: '@jolly_hustler',
    notes: 'Used invite code 1547719 for 6,000 bonus points. Completed video & offerwall tasks for $50 withdrawal.',
    earningSteps: [
      'Entered code 1547719 on registration for 6,000 bonus points',
      'Completed gaming offerwalls and quiz offers',
      'Reached $50 payout threshold and received payment'
    ],
    appUrl: '/apps',
    appId: 'jollycash',
    featured: true,
    upvotesCount: 178
  },
  {
    id: 'proof-binance-1',
    appName: 'Binance Learn & Earn',
    appCategory: 'Exchange',
    amount: '48.20',
    currency: 'USDT',
    usdEquivalent: '$48.20',
    payoutMethod: 'Binance Pay / Spot',
    txHash: 'Internal Transfer #8849201',
    proofImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
    date: '2025-02-05',
    status: 'Instant Payout',
    trustScore: 100,
    userHandle: '@sarah_m',
    notes: 'Completed 3 quiz modules in under 10 minutes and received instant reward voucher in Binance Spot account.',
    earningSteps: [
      'Opened Binance Learn & Earn section',
      'Watched educational crypto videos & answered quizzes',
      'Redeemed voucher instantly into Spot wallet balance'
    ],
    appUrl: '/apps',
    appId: '1',
    featured: false,
    upvotesCount: 265
  },
  {
    id: 'proof-ton-bot-1',
    appName: 'Catizen / TON Mini-App',
    appCategory: 'Telegram Bot',
    amount: '210.0',
    currency: 'CATI',
    usdEquivalent: '$189.00',
    payoutMethod: 'TON (Tonkeeper)',
    txHash: '438be92f11a89c2f10d45e99b01c3d',
    explorerUrl: 'https://tonscan.org/tx/438be92f11a89c2f10d45e99b01c3d',
    walletAddress: 'EQBp902m01n2b3v4c5x6z7a8b9c0d1e2f',
    proofImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&q=80',
    date: '2025-01-14',
    status: 'Verified On-Chain',
    trustScore: 98,
    userHandle: '@ton_earner',
    notes: 'Airdrop payout from gaming level 35 guild rewards on TON blockchain.',
    earningSteps: [
      'Played Catizen Telegram game to level 35',
      'Joined guild battle event and claimed CATI token drop',
      'Withdrew to Tonkeeper wallet'
    ],
    appUrl: '/apps',
    appId: '9',
    featured: false,
    upvotesCount: 190
  },
  {
    id: 'proof-nodle-1',
    appName: 'Nodle DePIN App',
    appCategory: 'Mining & Node',
    amount: '3,400.0',
    currency: 'NODL',
    usdEquivalent: '$85.00',
    payoutMethod: 'zkSync Era',
    txHash: '0x7a81ef3012a89c2f10d45e99b01c3d',
    explorerUrl: 'https://explorer.zksync.io/tx/0x7a81ef3012a89c2f10d45e99b01c3d',
    walletAddress: '0x8871C47xKX9qW2mLz8pQ1wE4rT6yU',
    proofImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&q=80',
    date: '2025-02-08',
    status: 'Verified On-Chain',
    trustScore: 97,
    userHandle: '@mobile_miner',
    notes: 'Passive bluetooth node walking earnings automatically transferred to zkSync wallet.',
    earningSteps: [
      'Installed Nodle mobile app with bluetooth enabled',
      'Collected Nodle Cash continuously during commute',
      'Received automated on-chain batch payout to zkSync wallet'
    ],
    appUrl: '/apps',
    appId: '10',
    featured: false,
    upvotesCount: 142
  },
  {
    id: 'proof-jumptask-1',
    appName: 'JumpTask & Honeygain',
    appCategory: 'Crypto App',
    amount: '18.20',
    currency: 'JMPT / USD',
    usdEquivalent: '$18.20',
    payoutMethod: 'Arbitrum / EVM',
    txHash: '0x18a972f10ba89c2f10d45e99b01c3d',
    explorerUrl: 'https://bscscan.com/tx/0x18a972f10ba89c2f10d45e99b01c3d',
    walletAddress: '0x3Fb8817xKX9qW2mLz8pQ1wE4rT6yU',
    proofImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
    date: '2025-02-07',
    status: 'Verified On-Chain',
    trustScore: 96,
    userHandle: '@jumptask_pro',
    notes: 'Watched YouTube videos & completed Google search microtasks. Processed in under 6 hours to Trust Wallet.',
    earningSteps: [
      'Completed micro-tasks on JumpTask dashboard',
      'Accumulated JMPT crypto tokens',
      'Requested withdrawal with $0.50 minimum threshold'
    ],
    appUrl: '/apps',
    appId: 'jumptask',
    featured: false,
    upvotesCount: 164
  },
  {
    id: 'proof-buzzerfan-1',
    appName: 'Buzzerfan',
    appCategory: 'Crypto App',
    amount: '22.00',
    currency: 'USDT',
    usdEquivalent: '$22.00',
    payoutMethod: 'Instant Payout',
    txHash: 'BZ-PAYOUT-110293',
    proofImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&q=80',
    date: '2025-02-06',
    status: 'Instant Payout',
    trustScore: 95,
    userHandle: '@sports_fan9',
    notes: 'Earned by uploading TikTok-style sports clips and referring friends with code 5390F5.',
    earningSteps: [
      'Uploaded short sports video highlights',
      'Invited friends using referral code 5390F5',
      'Cashed out USDT earnings to personal crypto wallet'
    ],
    appUrl: '/apps',
    appId: 'buzzerfan',
    featured: false,
    upvotesCount: 121
  }
];

export const getTotalWithdrawalUSD = () => {
  return withdrawalProofs.reduce((acc, curr) => {
    const numeric = parseFloat(curr.usdEquivalent.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(numeric) ? 0 : numeric);
  }, 0);
};

