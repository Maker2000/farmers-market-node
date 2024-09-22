import { NotFoundException } from '@nestjs/common';

export {};
declare global {
  interface Promise<T> {
    requireEntityFound(message?: string): Promise<T>;
  }
}
Promise.prototype.requireEntityFound = async function <T>(
  this: Promise<T>,
  message?: string,
): Promise<T> {
  let val = await this;
  if (val == null || val == undefined)
    throw new NotFoundException(message ?? 'Item not found');
  return val;
};
