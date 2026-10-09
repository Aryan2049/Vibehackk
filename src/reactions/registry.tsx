import type { JSX } from "react";
import type { ReactionKind } from "../types";
import type { ReactionProps } from "./shell";
import { CoffeeReaction, MilkReaction, SodaReaction, WaterReaction } from "./dairy";
import {
  BananaReaction,
  BreadReaction,
  ChipsReaction,
  ChocolateReaction,
  EggReaction,
} from "./food";
import {
  HeadphonesReaction,
  LaptopReaction,
  MouseReaction,
  PhoneReaction,
} from "./electronics";
import { HatReaction, ShoesReaction, SunglassesReaction, TShirtReaction } from "./fashion";
import { AlarmReaction, FanReaction, PillowReaction, VacuumReaction } from "./home";
import { PerfumeReaction, ShampooReaction, ToothpasteReaction } from "./beauty";
import { BookReaction, DuckReaction, PuzzleReaction, TeddyReaction } from "./toys";

export interface ReactionDef {
  Component: (props: ReactionProps) => JSX.Element;
  /** Auto-recover after this many ms. 0 means the reaction waits for the user. */
  duration: number;
}

export const REACTIONS: Record<ReactionKind, ReactionDef> = {
  milk: { Component: MilkReaction, duration: 6400 },
  coffee: { Component: CoffeeReaction, duration: 9000 },
  water: { Component: WaterReaction, duration: 7000 },
  soda: { Component: SodaReaction, duration: 6200 },
  egg: { Component: EggReaction, duration: 6200 },
  bread: { Component: BreadReaction, duration: 5600 },
  banana: { Component: BananaReaction, duration: 6600 },
  chips: { Component: ChipsReaction, duration: 6200 },
  chocolate: { Component: ChocolateReaction, duration: 6600 },
  phone: { Component: PhoneReaction, duration: 12000 },
  laptop: { Component: LaptopReaction, duration: 13000 },
  headphones: { Component: HeadphonesReaction, duration: 10000 },
  mouse: { Component: MouseReaction, duration: 4600 },
  tshirt: { Component: TShirtReaction, duration: 5800 },
  shoes: { Component: ShoesReaction, duration: 14000 },
  sunglasses: { Component: SunglassesReaction, duration: 5600 },
  hat: { Component: HatReaction, duration: 6200 },
  pillow: { Component: PillowReaction, duration: 10000 },
  alarm: { Component: AlarmReaction, duration: 12000 },
  vacuum: { Component: VacuumReaction, duration: 6400 },
  fan: { Component: FanReaction, duration: 5400 },
  shampoo: { Component: ShampooReaction, duration: 9000 },
  perfume: { Component: PerfumeReaction, duration: 6400 },
  toothpaste: { Component: ToothpasteReaction, duration: 5600 },
  teddy: { Component: TeddyReaction, duration: 6200 },
  book: { Component: BookReaction, duration: 9000 },
  puzzle: { Component: PuzzleReaction, duration: 16000 },
  duck: { Component: DuckReaction, duration: 16000 },
};
