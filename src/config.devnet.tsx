export interface DelegationContractType {
  name: string;
  gasLimit: number;
  data: string;
}

interface NetworkType {
  id: 'testnet' | 'mainnet' | 'devnet';
  name: string;
  egldLabel: string;
  walletAddress: string;
  gatewayAddress: string;
  explorerAddress: string;
  delegationContract: string;
  apiAddress: string;
}

export const DateReup = new Date();
export const TheDadteYear = DateReup.getFullYear();
export const minDust = '5000000000000000'; // 0.005 EGLD
export const dAppName = 'Middle Staking';
export const decimals = 2;
export const denomination = 18;
export const genesisTokenSupply = 20000000;
export const feesInEpoch = 0;
export const stakePerNode = 2500;
export const protocolSustainabilityRewards = 0.1;
export const yearSettings = [
  { year: 1, maximumInflation: 0.1084513 },
  { year: 2, maximumInflation: 0.09703538 },
  { year: 3, maximumInflation: 0.08561945 },
  { year: 4, maximumInflation: 0.07420352 },
  { year: 5, maximumInflation: 0.0627876 },
  { year: 6, maximumInflation: 0.05137167 },
  { year: 7, maximumInflation: 0.03995574 },
  { year: 8, maximumInflation: 0.02853982 },
  { year: 9, maximumInflation: 0.01712389 },
  { year: 10, maximumInflation: 0.00570796 },
  { year: 11, maximumInflation: 0.0 }
];

export const auctionContract =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l';
export const stakingContract =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7';
export const delegationManagerContract =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqylllslmq6y6';
export const walletConnectBridge = 'https://bridge.walletconnect.org';
export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/';

export const network: NetworkType = {
  id: 'devnet',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.elrond.com/dapp/init',
  apiAddress: 'https://devnet-api.elrond.com',
  gatewayAddress: 'https://devnet-gateway.elrond.com',
  explorerAddress: 'http://devnet-explorer.elrond.com',
  delegationContract:
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat'
};

export const delegationContractData: Array<DelegationContractType> = [
  {
    name: 'createNewDelegationContract',
    gasLimit: 6000000,
    data: 'createNewDelegationContract@'
  },
  {
    name: 'setAutomaticActivation',
    gasLimit: 6000000,
    data: 'setAutomaticActivation@'
  },
  {
    name: 'setMetaData',
    gasLimit: 6000000,
    data: 'setMetaData@'
  },
  {
    name: 'setReDelegateCapActivation',
    gasLimit: 6000000,
    data: 'setCheckCapOnReDelegateRewards@'
  },
  {
    name: 'changeServiceFee',
    gasLimit: 6000000,
    data: 'changeServiceFee@'
  },
  {
    name: 'modifyTotalDelegationCap',
    gasLimit: 6000000,
    data: 'modifyTotalDelegationCap@'
  },
  {
    name: 'addNodes',
    gasLimit: 12000000,
    data: 'addNodes'
  },
  {
    name: 'removeNodes',
    gasLimit: 12000000,
    data: 'removeNodes@'
  },
  {
    name: 'stakeNodes',
    gasLimit: 12000000,
    data: 'stakeNodes@'
  },
  {
    name: 'reStakeUnStakedNodes',
    gasLimit: 120000000,
    data: 'reStakeUnStakedNodes@'
  },
  {
    name: 'unStakeNodes',
    gasLimit: 12000000,
    data: 'unStakeNodes@'
  },
  {
    name: 'unBondNodes',
    gasLimit: 12000000,
    data: 'unBondNodes@'
  },
  {
    name: 'unJailNodes',
    gasLimit: 12000000,
    data: 'unJailNodes@'
  },
  {
    name: 'delegate',
    gasLimit: 12000000,
    data: 'delegate'
  },
  {
    name: 'unDelegate',
    gasLimit: 12000000,
    data: 'unDelegate@'
  },
  {
    name: 'withdraw',
    gasLimit: 12000000,
    data: 'withdraw'
  },
  {
    name: 'claimRewards',
    gasLimit: 6000000,
    data: 'claimRewards'
  },
  {
    name: 'reDelegateRewards',
    gasLimit: 12000000,
    data: 'reDelegateRewards'
  }
];

//Fusion =>
export const gasPerDataByte = 1500;
export const timeout = 10000; // 10 sec

//Contract Presale
export const contractPresaleAddress =
  'erd1qqqqqqqqqqqqqpgq0auj0eg4a2ppdqktynfe29ue9jtefjmfevsqv60226';

//(wallet pem 1)
//export const contractAdminAddress =
//  'erd1d0kvw4qf0rscrppq37fznnq8ppgjeu7yga40klf9xf2kkf00ee3sxahlvj';
//wallet-ext
// export const contractAdminAddress =
//   'erd1clutw0lqv766hel4ymlt30f026vz6gvwsvsuu9wkr8p2yvurs89sy0ljzx';
//ledger
export const contractAdminAddress =
  'erd1z2fejeltfmpjagt5z6uamvypey96v839tk38dt3yrq8lkngcfzmqs0932z';

//adresse de l'admin pour se connnecter au dashboard admin
export const AdminAddress =
  'erd1z2fejeltfmpjagt5z6uamvypey96v839tk38dt3yrq8lkngcfzmqs0932z';

//PRE-7d8f06 : 5052452d376438663036
export const midIdentifier = 'MID-b1e2df';

//Amount to buy per EGLD
export const midToBuy = '1000000000000000000000'; //1 000 000000000000000000
export const midPrice = '1000000000000000000'; //in EGLD 1 000000000000000000

export const midToSell = '100000000000000000000000'; //100 000

// export const network: NetworkType & {
//   graphQlAddress: string;
// } = {
//   id: 'mainnet',
//   name: 'Mainnet',
//   egldLabel: 'EGLD',
//   walletAddress: 'https://wallet.elrond.com',
//   apiAddress: 'https://api.elrond.com',
//   explorerAddress: 'https://explorer.elrond.com',
//   graphQlAddress: 'https://graph.maiar.exchange/graphql'
// };
