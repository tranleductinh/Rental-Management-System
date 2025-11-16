import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectStatus({ list, onValueChange, valueSelect }) {
  console.log("ListRoom", list)
  console.log("ValueRoom", valueSelect)
  return (
    <Select value={valueSelect} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={list.length > 0 ? list[0].label : ""}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem value={item.value}>{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
