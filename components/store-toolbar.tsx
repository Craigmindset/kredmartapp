"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StoreToolbarProps {
  onlyDeals: boolean;
  setOnlyDeals: (v: boolean) => void;
  sort: "htl" | "lth" | "none";
  setSort: (v: "htl" | "lth" | "none") => void;
  brand: string;
  setBrand: (v: string) => void;
  allBrands: string[];
}

export default function StoreToolbar({
  onlyDeals,
  setOnlyDeals,
  sort,
  setSort,
  brand,
  setBrand,
  allBrands,
}: StoreToolbarProps) {
  return (
    <div className="mt-6 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="deals"
            checked={onlyDeals}
            onCheckedChange={(v) => setOnlyDeals(Boolean(v))}
          />
          <Label htmlFor="deals">Deals</Label>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-sm">Sort</Label>
          <Select
            onValueChange={(v: "htl" | "lth" | "none") => setSort(v)}
            defaultValue="none"
            value={sort}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="htl">High to Low</SelectItem>
              <SelectItem value="lth">Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-sm">Brand</Label>
          <Select value={brand} onValueChange={(v) => setBrand(v)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              {allBrands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
