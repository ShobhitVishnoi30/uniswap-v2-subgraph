import { ERC20 as TokenContract } from "../../generated/Uniswap/ERC20";
import { Pair as PairContract } from "../../generated/uniswap/Pair";
import { UniswapV2Router as RouterContract } from "../../generated/Uniswap/UniswapV2Router";
import { UniswapV2Factory as FactoryContract } from "../../generated/Uniswap/UniswapV2Factory";
import { BigInt, Address } from "@graphprotocol/graph-ts";

/**
 * @description For fetching the decimal of the token
 * @param tokenAddress address of the token
 * @returns 18 or 8 or etc...
 */
export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let decimalValue = 0;
  let instance = TokenContract.bind(tokenAddress);
  let decimalResult = instance.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue);
}

/**
 * @description For fetching the name of the token
 * @param tokenAddress address of the token
 * @returns Uniswap  etc...
 */
export function fetchTokenName(tokenAddress: Address): string {
  let tokenName = "unknown";
  let instance = TokenContract.bind(tokenAddress);
  let nameResult = instance.try_name();
  if (!nameResult.reverted) {
    tokenName = nameResult.value;
  }
  return tokenName;
}

/**
 * @description For fetching the symbol of the token
 * @param tokenAddress address of the token
 * @returns UNI , ETH  etc...
 */
export function fetchTokenSymbol(tokenAddress: Address): string {
  let tokenSymbol = "unknown";
  let instance = TokenContract.bind(tokenAddress);
  let symbolResult = instance.try_symbol();
  if (!symbolResult.reverted) {
    tokenSymbol = symbolResult.value;
  }
  return tokenSymbol;
}
