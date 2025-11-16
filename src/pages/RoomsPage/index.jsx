import ManagementHeader from "@/components/ManagementHeader";
import ManagementTable from "@/components/ManagementTable";
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from "@/services/api/room";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

const RoomsPage = () => {
  const [room, setRoom] = useState([]);
  const [roomUpdate, setRoomUpdate] = useState({});
  const [roomFilter, setRoomFilter] = useState([]);
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const [tableHeader, setTableHeader] = useState([
    {
      name: "Name",
      title: "name",
    },
    {
      name: "Price",
      title: "price",
    },
    {
      name: "Status",
      title: "status",
    },
  ]);
  const [fieldRoom, setFieldRoom] = useState([
    {
      field: [
        {
          label: "Tên Phòng *",
          kind: "input",
          type: "text",
          place_holder: "VD: Phòng 101",
          name: "name",
        },
      ],
    },
    {
      field: [
        {
          label: "Giá Thuê/Tháng *",
          kind: "input",
          type: "number",
          place_holder: "0",
          name: "price",
        },
        {
          label: "Trạng Thái *",
          kind: "select",
          list: [
            {
              label: "Còn Trống",
              value: "available",
            },
            {
              label: "Đã Thuê",
              value: "occupied",
            },
            {
              label: "Bảo Trì",
              value: "maintenance",
            },
          ],
          name: "status",
        },
      ],
    },
    {
      field: [
        {
          label: "Mô Tả",
          kind: "textarea",
          place_holder: "Mô tả về phòng: diện tích, tiện nghi...",
          name: "description",
        },
      ],
    },
  ]);
  const handleOpenCreateChange = () => {
    setDialogTitle("Thêm Phòng Mới");
    setDialogButton("Tạo Phòng Mới");
    setOpenCreate(!openCreate);
  };
  const handleOpenUpdateChange = (_id) => {
    setDialogTitle("Chỉnh sửa phòng");
    setDialogButton("Cập Nhật Phòng");
    setRoomUpdate(room.find((item) => item._id === _id));
    setOpenUpdate(!openUpdate);
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  const fetchRoom = async () => {
    try {
      setLoading(true);
      const response = await getRooms();
      console.log("response", response.data.data);
      setRoom(response.data.data);
      setRoomFilter(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value) => {
    setRoomFilter(
      room.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCreate = async () => {
    console.log("payload", payload);
    try {
      setLoadingButton(true);
      await createRoom(payload);
      toast.success("Thêm phòng thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchRoom();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingButton(false);
    }
  };
  const handleUpdate = async (_id, payloadUpdate) => {
    try {
      setLoadingButton(true);
      const newPayload = {
        description: payloadUpdate.description,
        name: payloadUpdate.name,
        price: payloadUpdate.price,
        status: payloadUpdate.status,
        images: [],
      };
      await updateRoom(_id, newPayload);
      toast.success("Cập nhật phòng thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchRoom();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingButton(false);
    }
  };
  const handleDelete = async (id, key) => {
    try {
      setLoadingDelete(key);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await deleteRoom(id);
      toast.success("Xóa phòng thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchRoom();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingDelete("");
    }
  };
  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Rooms Management"
        des="Manage your rental rooms"
        button="Create room"
        titleDialog={dialogTitle}
        form={fieldRoom}
        handleFilter={handleFilter}
        setPayload={setPayload}
        payload={payload}
        handleCreate={handleCreate}
        loadingButton={loadingButton}
        dataUpdate={roomUpdate}
        openCreate={openCreate}
        handleOpenCreateChange={handleOpenCreateChange}
        dialogButton={dialogButton}
      />
      <ManagementTable
        form={fieldRoom}
        title="All Rooms"
        data={roomFilter}
        tbHeader={tableHeader}
        loading={loading}
        loadingButton={loadingButton}
        openUpdate={openUpdate}
        handleOpenUpdateChange={handleOpenUpdateChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        setPayload={setRoomUpdate}
        payload={roomUpdate}
        titleDialog={dialogTitle}
        loadingDelete={loadingDelete}
        dialogButton={dialogButton}
      />
    </div>
  );
};

export default RoomsPage;
