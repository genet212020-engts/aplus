export interface AppItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: 'Exchange' | 'Wallet' | 'Telegram Bot' | 'DePIN & Mining' | 'Tasks & Micro-Earning';
  downloadUrl: string;
  officialWebsiteUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  telegramUrl?: string;
  referralCode?: string;
  stepsToEarn?: string[];
  featured?: boolean;
  rating: number;
  reviewsCount: string;
  securityScore: number;
  welcomeBonus?: string;
  tags: string[];
  icon: string;
  highlights: string[];
  verified: boolean;
  earningPotential?: string;
}

export const apps: AppItem[] = [
  {
    id: 'mepass',
    name: 'ME PASS (MEC Token)',
    description: 'Crypto wallet & P2P token exchange (1 MEC ≈ $6). Earn MEC via daily check-in, Face & National ID / Passport verification!',
    longDescription: 'ME PASS is a verified crypto wallet and identity protocol with a built-in P2P trading exchange. Earn MEC token through daily check-ins and referral invites. Complete initial Face verification, then complete Me ID verification via National ID or Passport after 2-3 hours to instantly receive 1 MEC stake + 0.1 MEC fast bonus. Market price is ~ $6/MEC and can be sold immediately on P2P!',
    category: 'Wallet',
    officialWebsiteUrl: 'https://mec.me',
    downloadUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.metaearth.mepass',
    appStoreUrl: 'https://apps.apple.com/app/me-pass/id6475001150',
    referralCode: 'x4ccdp3m',
    featured: true,
    rating: 4.9,
    reviewsCount: '310K+',
    securityScore: 98,
    welcomeBonus: '1 MEC Stake + 0.1 MEC Instant (1 MEC ≈ $6)',
    tags: ['MEC Token', 'P2P Trading', 'ID Verification', 'Daily Check-in', '$6/MEC'],
    icon: '🛡️',
    highlights: [
      '1 MEC Token value ≈ $6 USD',
      'Instant built-in P2P crypto selling',
      '0.1 MEC fast payout upon ID verification',
      'Referral code: x4ccdp3m'
    ],
    stepsToEarn: [
      'Download Me Pass from Play Store / App Store or Link',
      'Sign up with Email, Password & Referral Code: x4ccdp3m',
      'Complete Face Verification first',
      'After 2-3 hours, complete Me ID verification using National ID or Passport',
      'Claim 1 MEC Stake + 0.1 MEC instant and sell via P2P!'
    ],
    verified: true,
    earningPotential: '💎 1 MEC ≈ $6 High Value'
  },
  {
    id: 'mpaisa',
    name: 'mPaisa App',
    description: 'Play games & complete tasks to earn Ethio Telecom airtime, Safaricom airtime, USDT crypto, or PUBG UC!',
    longDescription: 'mPaisa is a verified play-to-earn mobile rewards app. Earn coins by playing games, trying apps, and finishing task offers. Withdraw directly to Ethio Telecom balance, Safaricom airtime, USDT crypto wallet, or PUBG Mobile UC.',
    category: 'Tasks & Micro-Earning',
    officialWebsiteUrl: 'https://mpaisa.b4a.app/',
    downloadUrl: 'https://mpaisa.b4a.app/?uid=y5W9FCq0sN',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.gspl.mpaisa',
    featured: true,
    rating: 4.9,
    reviewsCount: '280K+',
    securityScore: 97,
    welcomeBonus: 'Free Bonus Coins on First Task',
    tags: ['Ethio Telecom', 'Safaricom', 'USDT', 'PUBG UC', 'Mobile Games'],
    icon: '🎮',
    highlights: [
      'Direct Ethio Telecom & Safaricom airtime',
      'USDT crypto withdrawal to any wallet',
      'Instant PUBG Mobile UC top-ups',
      'Multiple daily gaming tasks'
    ],
    stepsToEarn: [
      'Install mPaisa from Google Play Store or direct link',
      'Sign in with Google Account',
      'Complete your first game milestone or quick scratch card',
      'Collect bonus coins and choose withdrawal (Ethio Telecom, Safaricom, or USDT)'
    ],
    verified: true,
    earningPotential: '📱 Airtime & Crypto'
  },
  {
    id: 'hifami',
    name: 'HiFami App',
    description: 'Ultra-fast earning app with $0.10 minimum withdrawal, $0.10 instant signup bonus & $0.15 per referral!',
    longDescription: 'HiFami is a fast and simple online social earning app. Get an instant $0.10 welcome bonus as soon as you sign up and withdraw right away! Earn $0.15 for every friend who downloads using your link. Make $15+/week with minimal effort.',
    category: 'Tasks & Micro-Earning',
    officialWebsiteUrl: 'https://s.hifamiapp.com/',
    downloadUrl: 'https://s.hifamiapp.com/1/QZcAmAUEj',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.spacez.hifami',
    appStoreUrl: 'https://apps.apple.com/app/hifami/id6476839352',
    featured: true,
    rating: 4.9,
    reviewsCount: '210K+',
    securityScore: 99,
    welcomeBonus: '$0.10 Signup Bonus + $0.15/Referral',
    tags: ['$0.10 Min Payout', 'Instant Cash', 'Referral Rewards', '$15+/Week'],
    icon: '💵',
    highlights: [
      'Lowest minimum payout: $0.10 only!',
      '$0.10 instant signup bonus upon registration',
      '$0.15 bonus per referral app download',
      'Earn $15+ per week easily'
    ],
    stepsToEarn: [
      'Install HiFami via official website / Play Store link',
      'Create an account and claim $0.10 instant welcome bonus',
      'Participate in daily social events and casual tasks',
      'Share your invitation link to earn $0.15 per active friend'
    ],
    verified: true,
    earningPotential: '🔥 $15+/Week Income'
  },
  {
    id: 'jollycash',
    name: 'Jolly Cash',
    description: 'Watch videos, complete offer tasks, answer quizzes & level up games. Claim 6,000 points with Code 1547719!',
    longDescription: 'Jolly Cash allows users to earn cash by watching videos, completing offerwall tasks, answering trivia, and reaching game levels. Enter referral code 1547719 upon joining to claim 6,000 bonus points immediately. Minimum payout is $5.00 with 100% verified withdrawal proof.',
    category: 'Tasks & Micro-Earning',
    officialWebsiteUrl: 'https://jollycash.co/',
    downloadUrl: 'https://jollycash.co/?inviteCode=1547719&channelCode=h3UFVM',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=co.jollycash.app',
    referralCode: '1547719',
    featured: true,
    rating: 4.9,
    reviewsCount: '240K+',
    securityScore: 97,
    welcomeBonus: '6,000 Points Bonus with Code: 1547719',
    tags: ['6,000 Points Bonus', 'Watch Videos', 'Offerwall', '$5 Min Withdraw'],
    icon: '🎁',
    highlights: [
      'Get FREE 6,000 points with code: 1547719',
      'Watch videos & complete gaming offerwalls',
      'Minimum withdrawal threshold: $5.00',
      '100% verified payout proof'
    ],
    stepsToEarn: [
      'Download Jolly Cash from official portal or Google Play',
      'Register account and paste referral code: 1547719',
      'Claim 6,000 starting points bonus instantly',
      'Complete offerwall surveys or watch videos to reach $5.00 cashout'
    ],
    verified: true,
    earningPotential: '💰 $5.00 Minimum Payout'
  },
  {
    id: 'jumptask',
    name: 'JumpTask & Honeygain',
    description: 'Complete micro-tasks like watching YouTube, Google keyword searches, and Binance/Discord tasks. $0.50 min payout!',
    longDescription: 'JumpTask provides flexible micro-task options: watching YouTube videos and clicking links, searching target keywords on Google, and completing Discord or Binance verification tasks. Cash out to your crypto wallet starting from just $0.50 within 6 hours.',
    category: 'Tasks & Micro-Earning',
    officialWebsiteUrl: 'https://www.jumptask.io/',
    downloadUrl: 'https://join.honeygain.com/FITSU21037',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.honeygain.cash',
    appStoreUrl: 'https://apps.apple.com/app/honeygain-make-money-online/id1575791243',
    featured: true,
    rating: 4.8,
    reviewsCount: '520K+',
    securityScore: 96,
    welcomeBonus: 'Low $0.50 Withdrawal Minimum',
    tags: ['Micro Tasks', 'YouTube Watch', 'Google Search', 'Fast Payout'],
    icon: '🐝',
    highlights: [
      'Watch YouTube videos & confirm view link',
      'Google keyword search micro-tasks',
      'Minimum payout $0.50 processed within 6 hrs',
      'Binance & Discord tasks'
    ],
    stepsToEarn: [
      'Register free account at JumpTask / Honeygain',
      'Connect MetaMask, Trust Wallet, or BSC address',
      'Choose micro-tasks: search keywords, watch clips, or share bandwidth',
      'Withdraw $JMPT or USD starting at $0.50'
    ],
    verified: true,
    earningPotential: '⚡ $0.50 Low Threshold'
  },
  {
    id: 'buzzerfan',
    name: 'Buzzerfan',
    description: 'Post and watch TikTok-style short sports clips, invite friends, and earn cash rewards.',
    longDescription: 'Buzzerfan rewards sports enthusiasts for uploading and watching short viral sports videos, similar to TikTok. Earn rewards by engaging with clips and inviting friends with referral code 5390F5.',
    category: 'Tasks & Micro-Earning',
    officialWebsiteUrl: 'https://buzzerfan.com/',
    downloadUrl: 'https://app.buzzerfan.com/referral-invite/rs1fa1a539b1944f67b4960f575e3face4',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.buzzer.sports',
    appStoreUrl: 'https://apps.apple.com/app/buzzer-sports-community/id6475718910',
    referralCode: '5390F5',
    featured: true,
    rating: 4.8,
    reviewsCount: '150K+',
    securityScore: 95,
    welcomeBonus: 'Referral Rewards with Code: 5390F5',
    tags: ['Sports Videos', 'TikTok Style', 'Referral Code: 5390F5', 'Short Clips'],
    icon: '⚽',
    highlights: [
      'TikTok-style viral sports video platform',
      'Earn by watching and posting short clips',
      'Referral code: 5390F5'
    ],
    stepsToEarn: [
      'Install Buzzerfan from Google Play or App Store',
      'Sign up and enter referral code: 5390F5',
      'Watch highlights and post engaging sports reels',
      'Cash out creator & referral earnings via PayPal'
    ],
    verified: true,
    earningPotential: '💵 $10 - $25 / Week'
  },
  {
    id: '1',
    name: 'Binance',
    description: "World's largest crypto exchange. Trade Bitcoin, Ethereum, and 600+ altcoins with industry-lowest trading fees.",
    longDescription: 'Binance is the premier global crypto platform offering spot trading, futures leverage up to 125x, staking yields, launchpools, and direct P2P fiat deposits in over 100 currencies.',
    category: 'Exchange',
    officialWebsiteUrl: 'https://www.binance.com',
    downloadUrl: 'https://www.binance.com/en/download',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.binance.dev',
    appStoreUrl: 'https://apps.apple.com/app/binance-buy-bitcoin-crypto/id1436799971',
    featured: true,
    rating: 4.9,
    reviewsCount: '1.2M+',
    securityScore: 99,
    welcomeBonus: 'Up to $100 Trading Fee Credit',
    tags: ['Trading', 'Exchange', 'Launchpool', 'P2P'],
    icon: '🔶',
    highlights: ['Lowest 0.1% spot fee', 'Binance Earn yield hub', 'Integrated Web3 Wallet'],
    stepsToEarn: [
      'Open official Binance website or download official app',
      'Complete quick identity verification (KYC)',
      'Deposit via P2P with local bank or payment method',
      'Stake stablecoins or participate in Launchpool airdrops'
    ],
    verified: true,
    earningPotential: '🔥 High Staking Yields'
  },
  {
    id: '2',
    name: 'Trust Wallet',
    description: 'Most trusted self-custody multi-chain crypto wallet. Store, send, swap, and stake 10M+ digital assets securely.',
    longDescription: 'Trust Wallet provides full control over your private keys. Supports 100+ blockchains including Ethereum, Solana, Bitcoin, and BNB Chain with built-in dApp browser and DEX swapping.',
    category: 'Wallet',
    officialWebsiteUrl: 'https://trustwallet.com',
    downloadUrl: 'https://trustwallet.com/download',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    appStoreUrl: 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409',
    featured: true,
    rating: 4.8,
    reviewsCount: '850K+',
    securityScore: 98,
    welcomeBonus: 'Free In-App DEX Swap Fee Waiver',
    tags: ['Multi-Chain', 'Self-Custody', 'Staking', 'DeFi'],
    icon: '🛡️',
    highlights: ['Zero tracking or KYC', 'Built-in Web3 browser', 'Hardware wallet support'],
    stepsToEarn: [
      'Download Trust Wallet from Google Play or App Store',
      'Create new wallet and safely back up 12-word seed phrase',
      'Stake native tokens (BNB, SOL, ATOM, TRX) directly for up to 18% APY'
    ],
    verified: true,
    earningPotential: '⚡ In-Wallet Staking'
  },
  {
    id: '3',
    name: 'Blum Crypto Bot',
    description: 'Hybrid DEX & Tap-To-Earn Telegram app backed by Binance Labs. Earn Blum Points for future token drops.',
    longDescription: 'Blum combines decentralized trading with Telegram gaming. Collect BP every 8 hours, play drop mini-games, and invite friends for lifetime revenue share.',
    category: 'Telegram Bot',
    officialWebsiteUrl: 'https://www.blum.io',
    downloadUrl: 'https://t.me/BlumCryptoBot',
    telegramUrl: 'https://t.me/BlumCryptoBot',
    featured: true,
    rating: 4.9,
    reviewsCount: '2.5M+',
    securityScore: 95,
    welcomeBonus: '500 BP Welcome Reward',
    tags: ['Telegram', 'Tap-To-Earn', 'Binance Labs', 'Airdrop'],
    icon: '🌸',
    highlights: ['Binance Labs MVB VIII Batch', 'Instant DEX swaps inside Telegram', 'Daily drop game rewards'],
    stepsToEarn: [
      'Launch official Blum Telegram Bot',
      'Start farming BP tokens every 8 hours',
      'Play the Drop game to catch falling crystals',
      'Complete community tasks and invite friends'
    ],
    verified: true,
    earningPotential: '🚀 High Airdrop Potential'
  },
  {
    id: '4',
    name: 'Grass Network Node',
    description: 'Earn passive income by sharing unused internet bandwidth on the Wynd Network DePIN layer.',
    longDescription: 'Grass turns unused residential bandwidth into AI model training data without collecting personal browsing history. Run the node passively on mobile or web extension.',
    category: 'DePIN & Mining',
    officialWebsiteUrl: 'https://www.getgrass.io',
    downloadUrl: 'https://app.getgrass.io/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=io.getgrass.grass',
    featured: true,
    rating: 4.7,
    reviewsCount: '410K+',
    securityScore: 94,
    welcomeBonus: '5,000 Points Bonus On 100 Hrs',
    tags: ['DePIN', 'Passive Income', 'Solana', 'AI'],
    icon: '🌱',
    highlights: ['Zero performance drag', 'Solana mainnet token', '100% background automated'],
    stepsToEarn: [
      'Register on official Grass website',
      'Install Grass browser extension or Android app',
      'Keep node active in background while browsing',
      'Claim Grass points converted into tokens'
    ],
    verified: true,
    earningPotential: '💵 Passive Monthly Cash'
  },
  {
    id: '5',
    name: 'MetaMask',
    description: 'Leading Ethereum & EVM wallet. Essential gateway to decentralized finance, Web3 gaming, and NFTs.',
    longDescription: 'MetaMask powers millions of Web3 interactions. Features cross-chain swaps, Portfolio view, hardware wallet connection (Ledger, Trezor), and custom RPC node configurations.',
    category: 'Wallet',
    officialWebsiteUrl: 'https://metamask.io',
    downloadUrl: 'https://metamask.io/download',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=io.metamask',
    appStoreUrl: 'https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202',
    featured: false,
    rating: 4.6,
    reviewsCount: '620K+',
    securityScore: 97,
    welcomeBonus: 'Cross-Chain Bridge Discount',
    tags: ['EVM', 'DeFi', 'NFT', 'Web3'],
    icon: '🦊',
    highlights: ['Universal EVM standard', 'Snaps plugin ecosystem', 'Hardware wallet sync'],
    stepsToEarn: [
      'Download MetaMask from official website or app stores',
      'Securely save your Secret Recovery Phrase',
      'Connect to DeFi yield protocols and Web3 airdrops'
    ],
    verified: true
  },
  {
    id: '6',
    name: 'Phantom Wallet',
    description: 'Smooth, fast, and secure Web3 wallet built for Solana, Bitcoin, and Ethereum.',
    longDescription: 'Phantom provides an ultra-fast user experience on Solana with instant NFT previewing, token swapping, liquid staking (mSOL/JitoSOL), and automatic phishing protection.',
    category: 'Wallet',
    officialWebsiteUrl: 'https://phantom.app',
    downloadUrl: 'https://phantom.app/download',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.phantom',
    appStoreUrl: 'https://apps.apple.com/app/phantom-crypto-wallet/id1598432977',
    featured: false,
    rating: 4.9,
    reviewsCount: '540K+',
    securityScore: 98,
    welcomeBonus: 'Solana Gas Fee Rebate',
    tags: ['Solana', 'Bitcoin', 'NFT', 'Fast'],
    icon: '👻',
    highlights: ['Sub-second transactions', 'Solana & Ordinals support', 'Liquid staking integration'],
    stepsToEarn: [
      'Install Phantom wallet on iOS, Android or Chrome',
      'Deposit SOL and stake directly with validators for ~7% APY',
      'Explore Solana airdrops and NFT yield opportunities'
    ],
    verified: true,
    earningPotential: '⚡ Liquid Staking Yields'
  },
  {
    id: '7',
    name: 'Bybit',
    description: 'Premier crypto derivatives & Web3 IDO exchange. Trade futures, spot, and participate in Web3 launchpads.',
    longDescription: 'Bybit is renowned for high liquidity, ultra-low latency execution, unified trading accounts, and the Web3 Wallet IDO platform with guaranteed token allocations.',
    category: 'Exchange',
    officialWebsiteUrl: 'https://www.bybit.com',
    downloadUrl: 'https://www.bybit.com/en-US/download/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bybit.app',
    appStoreUrl: 'https://apps.apple.com/app/bybit-buy-trade-bitcoin/id1488296980',
    featured: false,
    rating: 4.8,
    reviewsCount: '490K+',
    securityScore: 97,
    welcomeBonus: 'Up to $30,000 Deposit Rewards',
    tags: ['Futures', 'Leverage', 'Web3 IDO', 'Copy Trading'],
    icon: '⚡',
    highlights: ['100x leverage liquidity', 'Guaranteed Web3 IDOs', 'Copy trading master accounts'],
    stepsToEarn: [
      'Register on official Bybit portal',
      'Claim new user voucher tasks in Rewards Hub',
      'Participate in Launchpool staking and Bybit Web3 IDO draws'
    ],
    verified: true
  },
  {
    id: '8',
    name: 'Tonkeeper Wallet',
    description: 'Official non-custodial wallet for the TON (The Open Network) ecosystem and Telegram Mini-Apps.',
    longDescription: 'Tonkeeper connects directly with Telegram username domains, Telegram Stars, mini-apps, and native TON staking pools with instant biometric authorization.',
    category: 'Wallet',
    officialWebsiteUrl: 'https://tonkeeper.com',
    downloadUrl: 'https://tonkeeper.com/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tonverse.tonkeeper',
    appStoreUrl: 'https://apps.apple.com/app/tonkeeper-ton-wallet/id1587742107',
    telegramUrl: 'https://t.me/tonkeeper',
    featured: false,
    rating: 4.8,
    reviewsCount: '310K+',
    securityScore: 96,
    tags: ['TON', 'Telegram', 'Staking', 'Mini-Apps'],
    icon: '💎',
    highlights: ['Seamless Telegram integration', '1-click TON staking', 'Gasless battery swaps'],
    stepsToEarn: [
      'Download Tonkeeper from Google Play or App Store',
      'Connect with Telegram mini-apps (Hamster, Blum, Notcoin)',
      'Stake TON directly inside wallet for steady staking yields'
    ],
    verified: true
  },
  {
    id: '9',
    name: 'Catizen Game Bot',
    description: 'Popular Telegram play-to-earn game backed by TON Foundation and HashKey Capital.',
    longDescription: 'Merge cats, build your feline cafe kingdom, and earn CATI token dividends on TON mainnet.',
    category: 'Telegram Bot',
    officialWebsiteUrl: 'https://catizen.ai',
    downloadUrl: 'https://t.me/catizenbot',
    telegramUrl: 'https://t.me/catizenbot',
    featured: false,
    rating: 4.7,
    reviewsCount: '1.8M+',
    securityScore: 93,
    welcomeBonus: 'Free Fish Coins Bonus',
    tags: ['Telegram', 'Gaming', 'TON', 'Airdrop'],
    icon: '🐱',
    highlights: ['TON Foundation ecosystem winner', 'Real-time guild earnings', 'Exchange auto-claims'],
    stepsToEarn: [
      'Open Catizen Telegram bot',
      'Merge cats to level up your cafe productivity',
      'Earn vKitty and claim CATI airdrop token allocations'
    ],
    verified: true
  },
  {
    id: '10',
    name: 'Nodle DePIN Network',
    description: 'Turn your smartphone into a DePIN node. Connect IoT devices and earn NODL tokens continuously.',
    longDescription: 'Nodle uses Bluetooth Low Energy (BLE) on everyday smartphones to locate smart assets and IoT sensors securely, rewarding node operators in NODL tokens.',
    category: 'DePIN & Mining',
    officialWebsiteUrl: 'https://www.nodle.com',
    downloadUrl: 'https://www.nodle.com',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.nodle.nodlecash',
    appStoreUrl: 'https://apps.apple.com/app/nodle-cash/id1480763553',
    featured: false,
    rating: 4.5,
    reviewsCount: '180K+',
    securityScore: 95,
    tags: ['DePIN', 'Bluetooth', 'zkSync', 'Mobile'],
    icon: '📱',
    highlights: ['Zero battery drain design', 'Instant zkSync wallet payouts', 'Proof of Connectivity'],
    stepsToEarn: [
      'Install Nodle Cash on Android or iOS',
      'Enable Bluetooth and location permissions',
      'Earn passive NODL tokens as your phone detects smart devices',
      'Transfer NODL to exchange via zkSync network'
    ],
    verified: true,
    earningPotential: '🚶 Earn While Walking'
  }
];
