import { schedule, Handler, HandlerEvent } from '@netlify/functions';
import { reactive } from 'vue';
import { useMintAddressUpdater } from '../../src/composables/useMintAddressUpdater';
import { usePandaData } from '../../src/composables/usePandaData';

export const handler: Handler = schedule(
  '*/3 * * * *',
  async (event: HandlerEvent) => {
    const pandas = reactive(usePandaData());
    const initialNFTs = await pandas.getAll();
    const hasUpdates = await useMintAddressUpdater(initialNFTs);
    const statusCode = hasUpdates ? 200 : 304;

    const eventBody = JSON.parse(event.body);
    console.log(`Next function run at ${eventBody.next_run}.`);

    return {
      statusCode: statusCode,
    };
  }
);
