import { schedule, Handler, HandlerEvent } from '@netlify/functions';
import { unref } from 'vue';
import useMintChecker from '../../src/composables/useMintChecker';
import { usePandaData } from '../../src/composables/usePandaData';

const getMintedNFTs = async (): Promise<any[]> => {
  const { NFTsMini } = await useMintChecker();
  const mintedNFTs = unref(NFTsMini);

  return mintedNFTs;
};

const getUnmintedIDs = async (): Promise<number[]> => {
  const { getAll } = usePandaData();
  const data = await getAll();
  const existingIDs = data.map((x) => x.id);

  return existingIDs;
};

const updateMintAddresses = async (list: any[]): Promise<void> => {
  const { update } = usePandaData();

  list.forEach((nft) => {
    const { id, address } = nft;
    update(id, { mintAddress: address });
  });
};

export const handler: Handler = schedule(
  '30 * * * *',
  async (event: HandlerEvent) => {
    const mintedNFTs = await getMintedNFTs();
    const mintedIDs = mintedNFTs.map((x) => x.id);
    const unmintedIDs = await getUnmintedIDs();

    const intersectionIDs = mintedIDs.filter((id) => unmintedIDs.includes(id));

    if (intersectionIDs.length > 0) {
      const list = mintedNFTs.filter((nft) => intersectionIDs.includes(nft.id));
      await updateMintAddresses(list);

      return {
        statusCode: 200,
      };
    }

    const eventBody = JSON.parse(event.body);
    console.log(`Next function run at ${eventBody.next_run}.`);

    return {
      statusCode: 304,
    };
  }
);
