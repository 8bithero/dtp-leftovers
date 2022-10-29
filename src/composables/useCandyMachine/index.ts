import { Connection } from '@solana/web3.js';
import { ref } from 'vue';
import {
  getMetadataAccounts,
  getMintAddresses,
  getNFTs,
  buildNFTDataMini,
} from './candyMachine';

export default async function useCandyMachine() {
  const mintAddresses = ref<string[]>([]);
  const metadataAccounts = ref<any[]>([]);
  const NFTs = ref<any[]>([]);
  const NFTsMini = ref<any[]>([]);
  const conn = new Connection(
    process.env.VUE_APP_RPC_SERVER_URL as string,
    'confirmed'
  );

  const accountsPromise = await getMetadataAccounts(conn);
  mintAddresses.value = getMintAddresses(accountsPromise);
  const NFTsPromise = await getNFTs(conn, mintAddresses.value);

  metadataAccounts.value = accountsPromise;
  NFTs.value = NFTsPromise;
  NFTsMini.value = buildNFTDataMini(NFTsPromise);

  return {
    mintAddresses,
    metadataAccounts,
    NFTs,
    NFTsMini,
  };
}
