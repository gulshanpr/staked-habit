import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Fallback } from "../generated/schema"
import { Fallback as FallbackEvent } from "../generated/Staking/Staking"
import { handleFallback } from "../src/staking"
import { createFallbackEvent } from "./staking-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let time = BigInt.fromI32(234)
    let _index = BigInt.fromI32(234)
    let data = Bytes.fromI32(1234567890)
    let newFallbackEvent = createFallbackEvent(
      sender,
      amount,
      time,
      _index,
      data
    )
    handleFallback(newFallbackEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Fallback created and stored", () => {
    assert.entityCount("Fallback", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Fallback",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Fallback",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Fallback",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "time",
      "234"
    )
    assert.fieldEquals(
      "Fallback",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_index",
      "234"
    )
    assert.fieldEquals(
      "Fallback",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
