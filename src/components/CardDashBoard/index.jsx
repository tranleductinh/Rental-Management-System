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
import CountUp from "react-countup";

const CardDashBoard = ({ title, value, icon, color, loading }) => {
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
          {loading === true ? (
            <div className="text-accent-foreground">...</div>
          ) : icon === "FileText" ? (
            <span>
              ₫<CountUp end={value} duration={2} />
            </span>
          ) : (
            <CountUp end={value} duration={2} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDashBoard;
