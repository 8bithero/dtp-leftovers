import { schedule, Handler, HandlerEvent } from '@netlify/functions';
import { useMintAddressUpdater } from '../../src/composables/useMintAddressUpdater';

export const handler: Handler = schedule(
  '@hourly',
  async (event: HandlerEvent) => {
    const hasUpdates = await useMintAddressUpdater();

    const statusCode = hasUpdates ? 200 : 304;

    const eventBody = JSON.parse(event.body);
    console.log(`Next function run at ${eventBody.next_run}.`);

    return {
      statusCode: statusCode,
    };
  }
);
