import CardDashBoard from "@/components/CardDashBoard";
import { useState } from "react";

const DashboardPage = () => {
  const [cardDashBoard, setCardDashBoard] = useState([
    {
      title: "Tổng Số Phòng",
      value: "3",
      icon: "House",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Tổng Người Thuê",
      value: "1",
      icon: "Users",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Tổng Hóa Đơn",
      value: "₫2,695,000",
      icon: "FileText",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Hóa Đơn Chưa Thanh Toán",
      value: "1",
      icon: "CircleAlert",
      color: "bg-red-100 text-red-600",
    },
  ]);
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
        <p class="text-muted-foreground mt-2">
          Overview of your rental property management
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardDashBoard.map((item) => (
          <CardDashBoard title={item.title} value={item.value} icon={item.icon} color={item.color}/>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
