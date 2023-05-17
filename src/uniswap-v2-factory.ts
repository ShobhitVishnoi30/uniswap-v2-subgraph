import { PairCreated as PairCreatedEvent } from "../generated/Uniswap/UniswapV2Factory";
import { PairInfo, Token, UniswapFactory } from "../generated/schema";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
} from "./utils/common";
import { FACTORY_ADDRESS } from "./utils/constant";

export function handlePairCreated(event: PairCreatedEvent): void {
  let factoryEntity = UniswapFactory.load(FACTORY_ADDRESS.toHexString());
  let pairEntity = PairInfo.load(event.params.pair.toHexString());
  let baseTokenEntity = Token.load(event.params.token0.toHexString());
  let quoteTokenEntity = Token.load(event.params.token1.toHexString());
  if (!factoryEntity) {
    factoryEntity = new UniswapFactory(FACTORY_ADDRESS.toHexString());
  }
  if (!pairEntity) {
    pairEntity = new PairInfo(event.params.pair.toHexString());
  }

  if (!baseTokenEntity) {
    baseTokenEntity = new Token(event.params.token0.toHexString());
    baseTokenEntity.decimals = fetchTokenDecimals(event.params.token0);
    baseTokenEntity.name = fetchTokenName(event.params.token0);
    baseTokenEntity.symbol = fetchTokenSymbol(event.params.token0);
  }

  if (!quoteTokenEntity) {
    quoteTokenEntity = new Token(event.params.token1.toHexString());
    quoteTokenEntity.decimals = fetchTokenDecimals(event.params.token1);
    quoteTokenEntity.name = fetchTokenName(event.params.token1);
    quoteTokenEntity.symbol = fetchTokenSymbol(event.params.token1);
  }

  factoryEntity.pairCount = factoryEntity.pairCount + 1;

  pairEntity.pairAddress = event.params.pair;
  pairEntity.transactionHash = event.transaction.hash;
  pairEntity.token0 = baseTokenEntity.id;
  pairEntity.token1 = quoteTokenEntity.id;
  pairEntity.creationTimestamp = event.block.timestamp;

  factoryEntity.save();
  pairEntity.save();
  baseTokenEntity.save();
  quoteTokenEntity.save();
}
