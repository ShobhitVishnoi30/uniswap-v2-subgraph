import { PairCreated as PairCreatedEvent } from "../generated/UniswapV2Factory/UniswapV2Factory";
import { PairInfo, UniswapFactory } from "../generated/schema";
import { FACTORY_ADDRESS } from "./utils/constant";

export function handlePairCreated(event: PairCreatedEvent): void {
  let factoryEntity = UniswapFactory.load(FACTORY_ADDRESS.toHexString());
  let pairEntity = PairInfo.load(event.params.pair.toHexString());
  if (!factoryEntity) {
    factoryEntity = new UniswapFactory(FACTORY_ADDRESS.toHexString());
  }
  if (!pairEntity) {
    pairEntity = new PairInfo(event.params.pair.toHexString());
  }
  factoryEntity.pairCount = factoryEntity.pairCount + 1;

  pairEntity.pairAddress = event.params.pair;
  pairEntity.transactionHash = event.transaction.hash;
  pairEntity.token0 = event.params.token0;
  pairEntity.token1 = event.params.token1;
  pairEntity.creationTimestamp = event.block.timestamp;

  factoryEntity.save();
  pairEntity.save();
}
