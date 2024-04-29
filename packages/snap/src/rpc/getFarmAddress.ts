import { isConnected } from './connect';


export function getFarmAddress(): string {
  if(!isConnected(origin)) return 'Not connected';

  const farmAddress = '0x1234567890123456789012345678901234567890';

  return farmAddress;
}