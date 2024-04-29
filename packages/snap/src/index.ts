import { OnRpcRequestHandler, UnauthorizedError } from '@metamask/snaps-sdk';
import { exportAccount, getAddresses, getNewAccount, importAccount } from './rpc/account';
import { LSAG_Signature } from './rpc';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {

  // reset storage -> fort debug
  // await snap.request({
  //   method: 'snap_manageState',
  //   params: { operation: ManageStateOperation.ClearState },
  // }) as object as State;

  switch (request.method) {
    case 'newAccount':
      return await getNewAccount();

    case 'importAccount':
      return await importAccount();

    case 'exportAccount':
      const address = (request.params as { address: string }).address;
      if (!address) throw new UnauthorizedError('Valid address is required');
      return await exportAccount(address);

    case 'getAddresses':
      return await getAddresses();

    case 'LSAG_Signature':
      const { ring, message, addressToUse, linkabilityFlag } = (request.params as { ring: string[],  message: string, addressToUse: string, linkabilityFlag: string });
      console.log('LSAG_Signature');
      return await LSAG_Signature(ring, message, addressToUse, linkabilityFlag);

    default:
      throw new Error('Method not found.');
  }
};
