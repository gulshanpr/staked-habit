import {
  Fallback as FallbackEvent,
  HabitCreated as HabitCreatedEvent,
  Received as ReceivedEvent,
  UnStack as UnStackEvent
} from "../generated/Staking/Staking"
import { Fallback, HabitCreated, Received, UnStack } from "../generated/schema"

export function handleFallback(event: FallbackEvent): void {
  let entity = new Fallback(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.time = event.params.time
  entity._index = event.params._index
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHabitCreated(event: HabitCreatedEvent): void {
  let entity = new HabitCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity.staker = event.params.staker
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReceived(event: ReceivedEvent): void {
  let entity = new Received(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity._index = event.params._index
  entity.time = event.params.time

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnStack(event: UnStackEvent): void {
  let entity = new UnStack(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.withdrawer = event.params.withdrawer
  entity.index = event.params.index
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
