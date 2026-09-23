"use client";

import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/state/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { HeroSectionOne } from "./_components/hero";

export default function Home() {
  const dispatch = useAppDispatch();

  const number = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <HeroSectionOne />
    </div>
  );
}
