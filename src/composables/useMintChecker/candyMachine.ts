import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey, AccountInfo } from '@solana/web3.js';
import bs58 from 'bs58';
import {
  CANDY_MACHINE_V2_PROGRAM,
  CREATOR_ARRAY_START,
  DTP_CANDY_MACHINE,
  MAX_METADATA_LEN,
  TOKEN_METADATA_PROGRAM,
} from './constants';

const getCandyMachineCreators = async (): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from('candy_machine'), DTP_CANDY_MACHINE.toBuffer()],
    CANDY_MACHINE_V2_PROGRAM
  );

const mintListPubKeys = (list: string[]) =>
  list.map((x: string) => new PublicKey(x));

const buildMiniNFTData = (nft: any) => ({
  id: parseInt(nft.name.match(/\d*$/)[0]),
  address: nft.mintAddress.toBase58(),
});

export const getMetadataAccounts = async (conn: Connection) => {
  const candyMachineCreators = await getCandyMachineCreators();

  const metadataAccounts = await conn.getProgramAccounts(
    TOKEN_METADATA_PROGRAM,
    {
      // The mint address is located at byte 33 and lasts for 32 bytes.
      dataSlice: { offset: 33, length: 32 },

      filters: [
        // Only get Metadata accounts.
        { dataSize: MAX_METADATA_LEN },

        // Filter using the first creator.
        {
          memcmp: {
            offset: CREATOR_ARRAY_START,
            bytes: candyMachineCreators[0].toBase58(),
          },
        },
      ],
    }
  );

  return metadataAccounts;
};

export const getMintAddresses = (
  metadataAccounts: { pubkey: PublicKey; account: AccountInfo<Buffer> }[]
) => metadataAccounts.map((account) => bs58.encode(account.account.data));

export const getNFTs = async (conn: Connection, mintList: string[]) => {
  const metaplex = new Metaplex(conn);

  const results = await metaplex.nfts().findAllByMintList({
    mints: mintListPubKeys(mintList),
  });

  return results;
};

export const buildNFTDataMini = (list: any[]) =>
  list.map((nft: any) => buildMiniNFTData(nft));
