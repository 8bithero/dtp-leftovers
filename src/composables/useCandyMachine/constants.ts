import { PublicKey } from '@solana/web3.js';

export const MAX_NAME_LENGTH = 32;
export const MAX_URI_LENGTH = 200;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_CREATOR_LEN = 32 + 1 + 1;
export const MAX_CREATOR_LIMIT = 5;
export const MAX_DATA_SIZE =
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  4 +
  MAX_URI_LENGTH +
  2 +
  1 +
  4 +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
export const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
export const CREATOR_ARRAY_START =
  1 +
  32 +
  32 +
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_URI_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  2 +
  1 +
  4;
// export const RPC_SERVER_URL = 'https://solana-api.projectserum.com';
// export const TOKEN_METADATA_PROGRAM = new PublicKey(
//   process.env.TOKEN_METADATA as string
// );
// export const CANDY_MACHINE_V2_PROGRAM = new PublicKey(
//   process.env.CANDY_MACHINE_V2 as string
// );
// export const DTP_CANDY_MACHINE = new PublicKey(
//   process.env.DTP_CANDY_MACHINE as string
// );

// export const RPC_SERVER_URL = 'https://solana-api.projectserum.com';
export const TOKEN_METADATA_PROGRAM = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);
export const CANDY_MACHINE_V2_PROGRAM = new PublicKey(
  'cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'
);
export const DTP_CANDY_MACHINE = new PublicKey(
  'C9uGSpNQ7PSCT5zr7ULBm8VjaXQ2oHvJtr836fqD1A9N'
);
