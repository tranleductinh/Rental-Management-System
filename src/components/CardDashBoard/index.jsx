import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert, FileText, House, Users } from "lucide-react";

const CardDashBoard = ({ title, value, icon, color }) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="text-sm font-medium">{title}</div>
        <div className={`p-2 rounded-lg bg-blue-100 ${color}`}>
          <House className={`w-4 h-4 ${icon === "House" ? "" : "hidden"}`} />
          <Users className={`w-4 h-4 ${icon === "Users" ? "" : "hidden"}`} />
          <FileText
            className={`w-4 h-4 ${icon === "FileText" ? "" : "hidden"}`}
          />
          <CircleAlert
            className={`w-4 h-4 ${icon === "CircleAlert" ? "" : "hidden"}`}
          />
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="text-2xl font-bold">
          <span>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDashBoard;
