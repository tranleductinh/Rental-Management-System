import CardDashBoard from "@/components/CardDashBoard";
import { getBills } from "@/services/api/bill";
import { getRooms } from "@/services/api/room";
import { getTenant } from "@/services/api/tenant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [cardDashBoard, setCardDashBoard] = useState([
    {
      title: "Tổng Số Phòng",
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
  const [room, setRoom] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [bill, setBill] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("ROOM DASHBOARD", room);
  console.log("TENANT DASHBOARD", tenant);
  console.log("BILL DASHBOARD", bill);
  useEffect(() => {
    fetchRoom();
    fetchTenant();
    fetchBill();
  }, []);
  useEffect(() => {
    setCardDashBoard(
      [...cardDashBoard],
      (
        (cardDashBoard[0].value = room.length),
      (cardDashBoard[1].value = tenant.length),
      (cardDashBoard[2].value = bill.reduce(
        (acc, item) => acc + item.total,
        0
      )),
      (cardDashBoard[3].value = bill.filter(
        (item) => item.status === "unpaid"
      ).length)
    )
  )
  }, [room,tenant,bill]);
  const fetchRoom = async () => {
    try {
      setLoading(true);
      const response = await getRooms();
      setRoom(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchTenant = async () => {
    try {
      const response = await getTenant();
      setTenant(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch tenants", {
        style: { background: "#333", color: "#fff" },
      });
    }
  };
  const fetchBill = async () => {
    try {
      const response = await getBills();
      setBill(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
        style: { background: "#333", color: "#fff" },
      });
    }
  };
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
          <CardDashBoard
          loading={loading}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
