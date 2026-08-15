export interface AirdropStep {
  stepNumber: number;
  title: string;
  description: string;
  link?: string;
}

export interface Airdrop {
  id: string;
  name: string;
  ticker: string;
  category: 'Testnet' | 'Node & Mining' | 'Staking' | 'Retroactive' | 'Telegram & Mini-App' | 'DeFi';
  blockchain: string;
  estimatedReward: string;
  investmentRequired: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Active' | 'Ending Soon' | 'Confirmed' | 'Upcoming';
  funding: string;
  icon: string;
  banner: string;
  shortDescription: string;
  fullDescription: string;
  airdropUrl: string;
  twitterUrl?: string;
  discordUrl?: string;
  telegramUrl?: string;
  requirements: string[];
  steps: AirdropStep[];
  featured?: boolean;
  isHot?: boolean;
  startDate: string;
  endDate: string;
}

export const airdropCategories = [
  { id: 'all', name: 'All Airdrops', icon: '⚡' },
  { id: 'Testnet', name: 'Testnet (100% Free)', icon: '🧪' },
  { id: 'Telegram & Mini-App', name: 'Telegram Bots', icon: '✈️' },
  { id: 'Node & Mining', name: 'Node & Depin Mining', icon: '💻' },
  { id: 'Retroactive', name: 'Retroactive', icon: '🔄' },
  { id: 'Staking', name: 'Staking & Yield', icon: '🥩' },
  { id: 'DeFi', name: 'DeFi Protocols', icon: '🌐' },
] as const;

export const airdrops: Airdrop[] = [
  {
    id: 'monad-testnet',
    name: 'Monad Testnet',
    ticker: 'MON',
    category: 'Testnet',
    blockchain: 'Monad EVM',
    estimatedReward: '$1,000 - $5,000+',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Easy',
    status: 'Active',
    funding: '$225M (Paradigm, DragonFly)',
    icon: '🟣',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    shortDescription: 'High-throughput 10,000 TPS EVM Layer-1 blockchain. Participate in testnet dApps and ecosystem tasks for potential MON token airdrop.',
    fullDescription: 'Monad is an ultra-high performance EVM-compatible Layer 1 blockchain offering 10,000 TPS with 1-second block times. Backed by $225M in venture funding led by Paradigm, Monad is preparing for its highly anticipated token generation event (TGE). Participating in testnet transactions, swapping on ecosystem DEXs, and earning roles in Discord are key to qualifying for the MON retroactive reward.',
    airdropUrl: 'https://testnet.monad.xyz/',
    twitterUrl: 'https://x.com/monad_xyz',
    discordUrl: 'https://discord.gg/monad',
    requirements: ['MetaMask Wallet', 'Discord Account', 'Twitter/X Account', 'Testnet MON Faucet'],
    featured: true,
    isHot: true,
    startDate: '2024-11-01',
    endDate: 'Q2 2025',
    steps: [
      {
        stepNumber: 1,
        title: 'Setup Monad Testnet RPC',
        description: 'Add the Monad Testnet network configuration to your EVM wallet (MetaMask, Rabby, or Phantom) via Chainlist or the official Monad portal.',
        link: 'https://testnet.monad.xyz/'
      },
      {
        stepNumber: 2,
        title: 'Claim Testnet MON Faucet',
        description: 'Claim daily testnet MON tokens from the official Monad Faucet or through verified ecosystem Discord channels.',
        link: 'https://faucet.monad.xyz/'
      },
      {
        stepNumber: 3,
        title: 'Interact with Ecosystem DEXs',
        description: 'Perform swaps, add liquidity, and stake testnet MON on dApps like Ambient Finance, MonadSwap, and Curvance.',
      },
      {
        stepNumber: 4,
        title: 'Mint Testnet NFTs & Deploy Contracts',
        description: 'Mint official testnet commemorative NFTs and deploy simple smart contracts using Remix or Thirdweb.'
      },
      {
        stepNumber: 5,
        title: 'Join Community & Earn Roles',
        description: 'Join the official Monad Discord and complete Galxe/Layer3 quests to earn early supporter badges.',
        link: 'https://discord.gg/monad'
      }
    ]
  },
  {
    id: 'grass-season-2',
    name: 'Grass Network - Season 2',
    ticker: 'GRASS',
    category: 'Node & Mining',
    blockchain: 'Solana',
    estimatedReward: '$300 - $2,000',
    investmentRequired: '$0 (Passive Bandwidth)',
    difficulty: 'Easy',
    status: 'Active',
    funding: '$4.5M (Polychain, Tribe Capital)',
    icon: '🌱',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    shortDescription: 'Earn passive crypto by sharing unused internet bandwidth for AI model training. Season 2 is live with increased rewards!',
    fullDescription: 'Grass is a DePIN (Decentralized Physical Infrastructure Network) protocol that enables users to monetize unused internet bandwidth by running a lightweight browser extension or node app. Grass was used to train major AI models and distributed millions in Season 1. Season 2 introduces new epoch multipliers, Desktop Node rewards, and enhanced referral bonuses.',
    airdropUrl: 'https://app.getgrass.io/',
    twitterUrl: 'https://x.com/getgrass_io',
    discordUrl: 'https://discord.gg/getgrass',
    requirements: ['Chrome/Brave Browser or Desktop App', 'Internet Connection', 'Email Registration'],
    featured: true,
    isHot: true,
    startDate: '2024-10-15',
    endDate: '2025-05-30',
    steps: [
      {
        stepNumber: 1,
        title: 'Register an Account',
        description: 'Create a free account on the official Grass Web Portal using your email address.',
        link: 'https://app.getgrass.io/'
      },
      {
        stepNumber: 2,
        title: 'Install Grass Extension or Desktop Node',
        description: 'Download the Grass Web Extension from Chrome Web Store or download the Desktop Node for a 2x uptime points multiplier.',
      },
      {
        stepNumber: 3,
        title: 'Keep Connection Active',
        description: 'Leave your browser open in the background to automatically accumulate points as bandwidth is shared securely.'
      },
      {
        stepNumber: 4,
        title: 'Connect Solana Wallet',
        description: 'Link your Phantom or Solflare wallet in your Grass profile settings to claim upcoming token distributions.',
      }
    ]
  },
  {
    id: 'berachain-bArtio',
    name: 'Berachain bArtio Testnet',
    ticker: 'BERA',
    category: 'Testnet',
    blockchain: 'Berachain (Proof-of-Liquidity)',
    estimatedReward: '$800 - $4,000+',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Medium',
    status: 'Ending Soon',
    funding: '$142M (Brevan Howard, Framework)',
    icon: '🐻',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    shortDescription: 'EVM-identical Layer 1 powered by Proof-of-Liquidity consensus. Mint HONEY, trade on BEX, and provide liquidity on bArtio v2.',
    fullDescription: 'Berachain is a high-performance EVM-compatible blockchain built on Proof-of-Liquidity consensus. With over $142M raised, Berachain features a tri-token ecosystem ($BERA, $BGT, $HONEY). Users participating in testnet swaps, liquidity provision, lending, and vault staking can accumulate BGT rewards which convert directly into the native BERA governance token upon Mainnet launch.',
    airdropUrl: 'https://bartio.testnet.berachain.com/',
    twitterUrl: 'https://x.com/berachain',
    discordUrl: 'https://discord.gg/berachain',
    requirements: ['EVM Wallet (MetaMask/Rabby)', 'BERA Testnet Faucet', 'Discord & Twitter'],
    featured: true,
    isHot: true,
    startDate: '2024-06-01',
    endDate: 'Q1 2025',
    steps: [
      {
        stepNumber: 1,
        title: 'Get BERA Testnet Faucet Tokens',
        description: 'Visit the official Berachain bArtio faucet and request testnet BERA tokens using your EVM address.',
        link: 'https://bartio.faucet.berachain.com/'
      },
      {
        stepNumber: 2,
        title: 'Trade on BEX (Bera Exchange)',
        description: 'Perform token swaps on BEX and supply liquidity to BERA/HONEY pools.',
        link: 'https://bartio.bex.berachain.com/'
      },
      {
        stepNumber: 3,
        title: 'Mint HONEY Stablecoin',
        description: 'Deposit stATOM or USDC collateral on Honey dApp to mint native HONEY tokens.',
        link: 'https://bartio.honey.berachain.com/'
      },
      {
        stepNumber: 4,
        title: 'Participate in Bend & Berps',
        description: 'Supply assets on Bend lending platform and open perps trades on Berps perpetual exchange.'
      }
    ]
  },
  {
    id: 'babylon-btc-staking',
    name: 'Babylon Bitcoin Staking Phase 2',
    ticker: 'BBN',
    category: 'Staking',
    blockchain: 'Bitcoin & Cosmos',
    estimatedReward: '$500 - $3,500',
    investmentRequired: 'Native BTC (Self-custodial)',
    difficulty: 'Medium',
    status: 'Active',
    funding: '$70M (Paradigm, Polychain)',
    icon: '⚡',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    shortDescription: 'Pioneering trustless Bitcoin staking protocol bringing economic security to PoS chains using native BTC.',
    fullDescription: 'Babylon is a revolutionary trustless Bitcoin staking protocol that lets BTC holders stake native Bitcoin to secure Proof-of-Stake networks without bridging or wrapped assets. Backed by $70M from Paradigm, Polychain, and Binance Labs, Babylon stakers receive staking yield and Babylon points eligible for the future BBN token airdrop.',
    airdropUrl: 'https://btcstaking.babylonlabs.io/',
    twitterUrl: 'https://x.com/babylonlabs_io',
    requirements: ['OKX Wallet or UniSat Wallet', 'Native BTC on Bitcoin Mainnet'],
    featured: false,
    isHot: true,
    startDate: '2024-08-22',
    endDate: '2025-06-30',
    steps: [
      {
        stepNumber: 1,
        title: 'Setup Bitcoin Staking Wallet',
        description: 'Install OKX Wallet, UniSat, or Tomo Wallet with Bitcoin native segwit / taproot address support.'
      },
      {
        stepNumber: 2,
        title: 'Stake BTC on Babylon Portal',
        description: 'Connect wallet to Babylon Bitcoin Staking portal and delegate BTC to a verified Finality Provider.',
        link: 'https://btcstaking.babylonlabs.io/'
      },
      {
        stepNumber: 3,
        title: 'Track Staking Points',
        description: 'Monitor accumulated staking points in your dashboard while maintaining full self-custody of staked Bitcoin.'
      }
    ]
  },
  {
    id: 'story-protocol',
    name: 'Story Protocol Odyssey Testnet',
    ticker: 'IP',
    category: 'Testnet',
    blockchain: 'Story L1 (Programmable IP)',
    estimatedReward: '$600 - $3,000',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Easy',
    status: 'Active',
    funding: '$140M (a16z, Polychain, Endeavor)',
    icon: '📖',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    shortDescription: 'World\'s first programmable Intellectual Property L1 blockchain. Register IP assets, mint licenses, and complete Odyssey quests.',
    fullDescription: 'Story Protocol is building the Layer 1 infrastructure for programmable IP, allowing creators to tokenize, license, and monetize creative assets directly on-chain. With $140M raised led by a16z crypto, Story Protocol\'s Odyssey Testnet rewards users who register IP assets, test ecosystem apps, and complete verified Galxe campaigns.',
    airdropUrl: 'https://odyssey.story.foundation/',
    twitterUrl: 'https://x.com/StoryProtocol',
    discordUrl: 'https://discord.gg/storyprotocol',
    requirements: ['EVM Wallet', 'IP Testnet Faucet', 'Twitter/X & Discord'],
    featured: true,
    isHot: false,
    startDate: '2024-09-10',
    endDate: 'Q2 2025',
    steps: [
      {
        stepNumber: 1,
        title: 'Claim Story Odyssey Faucet',
        description: 'Claim IP testnet tokens from the Story Protocol Odyssey faucet portal.',
        link: 'https://faucet.story.foundation/'
      },
      {
        stepNumber: 2,
        title: 'Register IP Assets',
        description: 'Upload artwork, music, or text on Story Protocol registration portal to tokenize your IP.'
      },
      {
        stepNumber: 3,
        title: 'Complete Odyssey Quests',
        description: 'Complete official Odyssey ecosystem tasks on Galxe and earn commemorative badges.',
        link: 'https://app.galxe.com/quest/story'
      }
    ]
  },
  {
    id: 'blum-crypto',
    name: 'Blum Telegram Mini-App',
    ticker: 'BLUM',
    category: 'Telegram & Mini-App',
    blockchain: 'TON & Hybrid',
    estimatedReward: '$150 - $1,200',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Easy',
    status: 'Active',
    funding: 'Binance Labs MVB Incubated',
    icon: '🌸',
    banner: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    shortDescription: 'Hybrid exchange backed by ex-Binance executives & Binance MVB. Farm Blum points, play Drop Game, and complete tasks on Telegram.',
    fullDescription: 'Blum is a hybrid crypto exchange built into a Telegram Mini-App, offering universal token access across CEXs and DEXs. Founded by former Binance executives and incubated by Binance MVB, Blum has grown to over 60M users. Farming Blum points daily, completing daily quests, and playing the drop game secures eligibility for the upcoming $BLUM token distribution.',
    airdropUrl: 'https://t.me/BlumCryptoBot',
    telegramUrl: 'https://t.me/BlumCryptoBot',
    twitterUrl: 'https://x.com/blumcrypto',
    requirements: ['Telegram App', 'TON Wallet (TONkeeper or Telegram Wallet)'],
    featured: false,
    isHot: true,
    startDate: '2024-04-01',
    endDate: 'Q1 2025',
    steps: [
      {
        stepNumber: 1,
        title: 'Open Blum Telegram Bot',
        description: 'Launch the Blum Telegram Mini-App via official invite link.',
        link: 'https://t.me/BlumCryptoBot'
      },
      {
        stepNumber: 2,
        title: 'Start Daily Farming',
        description: 'Tap "Start Farming" every 8 hours to collect passive Blum points.'
      },
      {
        stepNumber: 3,
        title: 'Play Drop Game & Complete Tasks',
        description: 'Use daily game tickets to play the flower drop game and complete simple video/social tasks for bonus points.'
      },
      {
        stepNumber: 4,
        title: 'Connect TON Wallet',
        description: 'Bind your Tonkeeper or Telegram Ton Space wallet under the Wallet tab.'
      }
    ]
  },
  {
    id: 'movement-labs',
    name: 'Movement Labs Testnet (Move EVM)',
    ticker: 'MOVE',
    category: 'Testnet',
    blockchain: 'Movement L2 (Move language)',
    estimatedReward: '$500 - $2,500',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Medium',
    status: 'Active',
    funding: '$38M (Polychain, Hack VC)',
    icon: '🟡',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    shortDescription: 'Network of Move-based blockchains introducing Move language security to Ethereum EVM environment.',
    fullDescription: 'Movement Labs is building a modular network of Move-based blockchains, introducing the Move programming language to the Ethereum ecosystem. Backed by $38M from Polychain and Hack VC, the Movement Olympus Testnet rewards users for testing Move EVM bridges, swapping on DEXs, and deploying smart contracts.',
    airdropUrl: 'https://testnet.movementlabs.xyz/',
    twitterUrl: 'https://x.com/movementlabsxyz',
    discordUrl: 'https://discord.gg/movementlabs',
    requirements: ['Nightly Wallet or Razor Wallet', 'Move Testnet Faucet'],
    featured: false,
    isHot: false,
    startDate: '2024-08-01',
    endDate: 'Q2 2025',
    steps: [
      {
        stepNumber: 1,
        title: 'Install Nightly Wallet',
        description: 'Download Nightly Wallet browser extension supporting Movement M2 testnet.'
      },
      {
        stepNumber: 2,
        title: 'Request Testnet MOVE',
        description: 'Use the official Movement Faucet to claim testnet MOVE tokens.',
        link: 'https://faucet.movementlabs.xyz/'
      },
      {
        stepNumber: 3,
        title: 'Interact with Testnet Ecosystem',
        description: 'Swap on Meridian DEX, deposit on Interest Protocol, and interact with testnet dApps.'
      }
    ]
  },
  {
    id: 'megaeth-testnet',
    name: 'MegaETH Real-time Blockchain',
    ticker: 'MEGA',
    category: 'Testnet',
    blockchain: 'MegaETH L2',
    estimatedReward: '$1,000 - $6,000',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Medium',
    status: 'Upcoming',
    funding: '$20M (Vitalik Buterin, Dragonfly)',
    icon: '⚡',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    shortDescription: 'The first real-time EVM blockchain capable of 100,000 TPS with sub-millisecond latency. Backed by Vitalik Buterin.',
    fullDescription: 'MegaETH is building the world\'s first real-time EVM execution engine capable of achieving 100,000 transactions per second with sub-millisecond response times. Backed by Ethereum co-founder Vitalik Buterin and Dragonfly Capital, early community members who register for developer/testnet access and participate in Discord early roles position themselves for prime airdrop rewards.',
    airdropUrl: 'https://megaeth.systems/',
    twitterUrl: 'https://x.com/megaeth_labs',
    discordUrl: 'https://discord.gg/megaeth',
    requirements: ['EVM Wallet', 'Discord', 'Twitter'],
    featured: true,
    isHot: true,
    startDate: '2025-01-01',
    endDate: '2025-08-30',
    steps: [
      {
        stepNumber: 1,
        title: 'Register Interest on Official Website',
        description: 'Submit your email and EVM wallet address on the official MegaETH portal.',
        link: 'https://megaeth.systems/'
      },
      {
        stepNumber: 2,
        title: 'Join Discord & Twitter',
        description: 'Follow @megaeth_labs on X and secure early roles in the Discord community.'
      },
      {
        stepNumber: 3,
        title: 'Prepare EVM Wallet for Public Testnet',
        description: 'Get Sepolia ETH faucet ready on your EVM wallet for when the public testnet bridge goes live.'
      }
    ]
  }
];

export const getFeaturedAirdrops = () => (airdrops || []).filter(a => a?.featured);
export const getAirdropById = (id: string) => (airdrops || []).find(a => a?.id === id);
