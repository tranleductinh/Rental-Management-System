import {
  AlertCircleIcon,
  BadgeCheckIcon,
  CheckIcon,
  LoaderCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeStatus({ status, loadingChangeStatus, index }) {
  console.log("LOAĐING", loadingChangeStatus);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          className={`${
            status === "available" || status === "paid"
              ? "bg-green-100 text-green-700 py-1"
              : "hidden"
          }`}
        >
          <LoaderCircle
            className={`${
              loadingChangeStatus === index && status === "paid"
                ? "animate-spin"
                : "hidden"
            }`}
          />
          {status === "available"
            ? "Còn Trống"
            : status === "paid"
            ? "paid"
            : ""}
        </Badge>
        <Badge
          className={`${
            status === "occupied" ? "bg-blue-100 text-blue-700 py-1" : "hidden"
          }`}
        >
          {status === "occupied" ? "Đã Thuê" : ""}
        </Badge>
        <Badge
          className={`${
            status === "maintenance" || status === "unpaid"
              ? "bg-red-100 text-red-700 py-1"
              : "hidden"
          }`}
        >
          <LoaderCircle
            className={`${
              loadingChangeStatus === index && status === "unpaid"
                ? "animate-spin"
                : "hidden"
            }`}
          />{" "}
          {status === "maintenance"
            ? "Bảo Trì"
            : status === "unpaid"
            ? "unpaid"
            : ""}
        </Badge>
      </div>
    </div>
  );
}
