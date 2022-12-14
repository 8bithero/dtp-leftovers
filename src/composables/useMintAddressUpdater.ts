import { INFTData2 } from '@/common/types';
import { reactive, unref } from 'vue';
import useCandyMachine from './useCandyMachine';
import { usePandaData } from './usePandaData';

export const useMintAddressUpdater = async (initialNFTs: INFTData2[] = []) => {
  const pandas = reactive(usePandaData());

  const getMintedNFTs = async (): Promise<any[]> => {
    const { NFTsMini } = await useCandyMachine();

    return unref(NFTsMini);
  };

  const getUnmintedIDs = async (): Promise<number[]> => {
    const data = initialNFTs.length > 0 ? initialNFTs : await pandas.getAll();
    const existingIDs = data.map((x) => x.id);

    return existingIDs;
  };

  const updateMintAddresses = async (
    mintedNFTs: any[],
    intersectionIDs: number[]
  ): Promise<void> => {
    const list = mintedNFTs.filter((nft) => intersectionIDs.includes(nft.id));

    list.forEach(async (nft) => {
      const { id, address } = nft;

      console.log(':UPDATING: ', `${id}: ${address}`);
      await pandas.update(id, { mintAddress: address });
    });
  };

  const mintedNFTs = await getMintedNFTs();
  const mintedIDs = mintedNFTs.map((x) => x.id);
  const unmintedIDs = await getUnmintedIDs();
  const intersectionIDs = mintedIDs.filter((id) => unmintedIDs.includes(id));

  return intersectionIDs.length > 0
    ? await updateMintAddresses(mintedNFTs, intersectionIDs).then(() => true)
    : false;
};
