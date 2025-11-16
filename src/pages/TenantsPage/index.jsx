import ManagementHeader from "@/components/ManagementHeader";
import ManagementTable from "@/components/ManagementTable";
import { getRooms } from "@/services/api/room";
import {
  createTenant,
  deleteTenant,
  getTenant,
  updateTenant,
} from "@/services/api/tenant";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TenantsPage = () => {
  const [tenant, setTenant] = useState([]);
  const [tenantFilter, setTenantFilter] = useState([]);
  const [room, setRoom] = useState([]);
  const [tenantUpdate, setTenantUpdate] = useState({});
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const [fieldTenant, setFieldTenant] = useState([
    {
      group: "Thông Tin Cơ Bản",
      field: [
        {
          label: "Họ và Tên *",
          kind: "input",
          type: "text",
          place_holder: "Nguyễn Văn A",
          name: "name",
        },
        {
          label: "Số điện thoại *",
          kind: "input",
          type: "text",
          place_holder: "0987654321",
          name: "phone",
        },
        {
          label: "Email",
          kind: "input",
          type: "email",
          place_holder: "example@gmail.com",
          name: "email",
        },
        {
          label: "CMND/CCCD *",
          kind: "input",
          type: "text",
          place_holder: "079123456789",
          name: "idCard",
        },
      ],
    },
    {
      group: "Phòng & Trạng Thái",
      field: [
        {
          label: "Phòng",
          kind: "select",
          name: "roomId",
        },
        {
          label: "Trạng Thái",
          kind: "select",
          name: "status",
          list: [
            {
              label: "Đang Thuê",
              value: "active",
            },
            {
              label: "Đã Trả Phòng",
              value: "moved_out",
            },
          ],
        },
      ],
    },
    {
      group: "Ngày Tháng",
      field: [
        {
          label: "Ngày Vào Ở",
          kind: "input",
          type: "date",
          name: "moveInDate",
        },
        {
          label: "Ngày Trả Phòng",
          kind: "input",
          type: "date",
          name: "moveOutDate",
        },
      ],
    },
    {
      group: "Ghi Chú",
      field: [
        {
          kind: "textarea",
          place_holder: "Ghi chú thêm về người thuê...",
          name: "note",
        },
      ],
    },
  ]);
  const [tableHeader, setTableHeader] = useState([
    {
      name: "Name",
      title: "name",
    },
    {
      name: "Phone",
      title: "phone",
    },
    {
      name: "ID Card",
      title: "idCard",
    },
    {
      name: "Room",
      title: "roomId.name",
    },
  ]);
  const handleOpenCreateChange = () => {
    setDialogTitle("Thêm Người Thuê Mới");
    setDialogButton("Thêm Người Thuê");
    setOpenCreate(!openCreate);
  };
  const handleOpenUpdateChange = async (_id) => {
    setDialogTitle("Chỉnh Sửa Thông Tin");
    setDialogButton("Cập Nhật Thông Tin");
    if (_id) {
      setTenantUpdate(tenant.find((item) => item._id === _id));
    }
    setOpenUpdate(!openUpdate);
    
  };
  useEffect(() => {
    fetchTenant();
    fetchRoom();
  }, []);
  useEffect(() => {
    setFieldTenant(
      [...fieldTenant],
      (fieldTenant.find(
        (item) => item.group === "Phòng & Trạng Thái"
      ).field[0].list = room
        .filter((item) => item.status === "available")
        .map((itemRoom) => ({
          label: itemRoom.name,
          value: itemRoom._id,
        })))
    );
  }, [room]);
  const fetchRoom = async () => {
    try {
      const response = await getRooms();
      setRoom(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch rooms", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      fetchTenant;
    }
  };
  const fetchTenant = async () => {
    try {
      setLoading(true);
      const response = await getTenant();
      setTenant(response.data.data);
      setTenantFilter(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch tenants", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async () => {
    try {
      setLoadingButton(true);
      const newPayload = {
        idCard: payload.idCard,
        moveInDate: payload.moveInDate,
        moveOutDate: payload.moveOutDate,
        name: payload.name,
        note: payload.note,
        phone: payload.phone,
        roomId: payload.roomId._id,
        status: payload.status,
      };
      await createTenant(newPayload);
      toast.success("Thêm người thuê mới thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchTenant();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch tenant", {
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
        idCard: payloadUpdate.idCard,
        moveInDate: payloadUpdate.moveInDate,
        moveOutDate: payloadUpdate.moveOutDate,
        name: payloadUpdate.name,
        note: payloadUpdate.note,
        phone: payloadUpdate.phone,
        roomId: payloadUpdate.roomId._id,
        status: payloadUpdate.status,
      };
      await updateTenant(_id, newPayload);
      toast.success("Cập nhật người thuê thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchTenant();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch tenant", {
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
      await deleteTenant(id);
      toast.success("Xóa người thuê thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchTenant();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.error || "Failed to fetch tenant", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingDelete("");
    }
  };
  const handleFilter = (value) => {
    setTenantFilter(
      tenant.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Tenants Management"
        des="Manage your tenants"
        button="Add tenant"
        titleDialog={dialogTitle}
        form={fieldTenant}
        handleFilter={handleFilter}
        setPayload={setPayload}
        payload={payload}
        handleCreate={handleCreate}
        loadingButton={loadingButton}
        openCreate={openCreate}
        handleOpenCreateChange={handleOpenCreateChange}
        dialogButton={dialogButton}
      />
      <ManagementTable
        title="All Tenants"
        data={tenantFilter}
        tbHeader={tableHeader}
        form={fieldTenant}
        loading={loading}
        loadingButton={loadingButton}
        openUpdate={openUpdate}
        handleOpenUpdateChange={handleOpenUpdateChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        setPayload={setTenantUpdate}
        payload={tenantUpdate}
        titleDialog={dialogTitle}
        loadingDelete={loadingDelete}
        dialogButton={dialogButton}
      />
    </div>
  );
};

export default TenantsPage;
