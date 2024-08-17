import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Fallback,
  HabitCreated,
  Received,
  UnStack
} from "../generated/Staking/Staking"

export function createFallbackEvent(
  sender: Address,
  amount: BigInt,
  time: BigInt,
  _index: BigInt,
  data: Bytes
): Fallback {
  let fallbackEvent = changetype<Fallback>(newMockEvent())

  fallbackEvent.parameters = new Array()

  fallbackEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  fallbackEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  fallbackEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )
  fallbackEvent.parameters.push(
    new ethereum.EventParam("_index", ethereum.Value.fromUnsignedBigInt(_index))
  )
  fallbackEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return fallbackEvent
}

export function createHabitCreatedEvent(
  index: BigInt,
  staker: Address,
  amount: BigInt
): HabitCreated {
  let habitCreatedEvent = changetype<HabitCreated>(newMockEvent())

  habitCreatedEvent.parameters = new Array()

  habitCreatedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  habitCreatedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  habitCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return habitCreatedEvent
}

export function createReceivedEvent(
  sender: Address,
  amount: BigInt,
  _index: BigInt,
  time: BigInt
): Received {
  let receivedEvent = changetype<Received>(newMockEvent())

  receivedEvent.parameters = new Array()

  receivedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  receivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  receivedEvent.parameters.push(
    new ethereum.EventParam("_index", ethereum.Value.fromUnsignedBigInt(_index))
  )
  receivedEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return receivedEvent
}

export function createUnStackEvent(
  withdrawer: Address,
  index: BigInt,
  amount: BigInt
): UnStack {
  let unStackEvent = changetype<UnStack>(newMockEvent())

  unStackEvent.parameters = new Array()

  unStackEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  unStackEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  unStackEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unStackEvent
}
