"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec",
];

export default function MonthYearPicker({ value, onChange }) {
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(value?.getFullYear() || currentYear);

  const handleSelect = (monthIndex) => {
    const newDate = new Date(selectedYear, monthIndex, 1);
    onChange(newDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {value ? value.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Chọn tháng"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-4 space-y-4">
        {/* YEAR SELECT */}
        <div className="grid grid-cols-3 gap-2">
          {yearList.map((y) => (
            <Button
              key={y}
              variant={y === selectedYear ? "default" : "ghost"}
              onClick={() => setSelectedYear(y)}
              className="w-full"
            >
              {y}
            </Button>
          ))}
        </div>

        {/* MONTH SELECT */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          {months.map((m, i) => (
            <Button
              key={i}
              variant={
                value &&
                value.getFullYear() === selectedYear &&
                value.getMonth() === i
                  ? "default"
                  : "ghost"
              }
              onClick={() => handleSelect(i)}
              className="w-full"
            >
              {m}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
