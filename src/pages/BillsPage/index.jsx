import ManagementHeader from "@/components/ManagementHeader";
import ManagementTable from "@/components/ManagementTable";
import {
  createBill,
  deleteBill,
  getBills,
  updateBill,
} from "@/services/api/bill";
import { getRooms } from "@/services/api/room";
import { getSettings } from "@/services/api/setting";
import { getTenant, updateTenant } from "@/services/api/tenant";
import { formatNumber } from "@/untils/managementRental";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BillsPage = () => {
  const [bill, setBill] = useState([]);
  const [room, setRoom] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [setting, setSetting] = useState([]);
  const [payload, setPayLoad] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState("");
  const [loadingChangeStatus, setLoadingChangeStatus] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const [tableHeader, setTableHeader] = useState([
    {
      name: "Tenant",
      title: "tenantId.name",
    },
    {
      name: "Room",
      title: "roomId.name",
    },
    {
      name: "Month",
      title: "month",
    },
    {
      name: "Breakdown",
      title: [
        {
          name: "Electricity",
          title: "electricityPrice",
          old: "oldElectricityIndex",
          new: "newElectricityIndex",
        },
        {
          name: "Water",
          title: "waterPrice",
          old: "oldWaterIndex",
          new: "newWaterIndex",
        },
        {
          name: "Internet",
          title: "internetFee",
        },
        {
          name: "Rent",
          title: "rent",
        },
      ],
    },
    {
      name: "Total",
      title: "total",
    },
    {
      name: "Status",
      title: "status",
    },
  ]);
  const [fieldBill, setFieldBill] = useState([
    {
      group: "Thông Tin Cơ Bản",
      field: [
        {
          label: "Người Thuê *",
          kind: "select",
          name: "tenantId",
        },
        {
          label: "Phòng *",
          kind: "select",
          name: "roomId",
        },
        {
          label: "Tháng *",
          kind: "month",
          name: "month",
        },
      ],
    },
    {
      group: "Chỉ Số Điện Nước",
      field: [
        {
          label: "Chỉ Số Cũ (kWh)",
          kind: "input",
          type: "number",
          des: "₫3,000/kWh",
          name: "oldElectricityIndex",
        },
        {
          label: "Chỉ Số Mới (kWh)",
          kind: "input",
          type: "number",
          des: "₫3,000/kWh",
          name: "newElectricityIndex",
        },
        {
          label: "Chỉ Số Cũ (m³)",
          kind: "input",
          type: "number",
          des: "₫15,000/m³",
          name: "oldWaterIndex",
        },
        {
          label: "Chỉ Số mới (m³)",
          kind: "input",
          type: "number",
          des: "₫15,000/m³",
          name: "newWaterIndex",
        },
      ],
    },
    {
      group: "Thanh Toán",
      field: [
        {
          label: "Tiền Thuê Phòng *",
          kind: "input",
          type: "number",
          name: "rent",
        },
        {
          label: "Trạng Thái *",
          kind: "select",
          name: "status",
          list: [
            {
              label: "Đã Thanh Toán",
              value: "paid",
            },
            {
              label: "Chưa Thanh Toán",
              value: "unpaid",
            },
          ],
        },
      ],
    },
    {
      group: "Ghi Chú",
      field: [
        {
          kind: "textarea",
          place_holder: "Ghi chú thêm về hóa đơn...",
          name: "note",
        },
      ],
    },
  ]);
  const handleOpenCreateChange = () => {
    setDialogTitle("Tạo Hóa Đơn Mới");
    setDialogButton("Tạo Hóa Đơn Mới");
    setOpenCreate(!openCreate);
    setFieldBill(
      [...fieldBill],
      ((fieldBill[1].field[0].des = `₫${formatNumber(
        setting.electricityPrice
      )}/kWh`),
      (fieldBill[1].field[1].des = `₫${formatNumber(
        setting.electricityPrice
      )}/kWh`),
      (fieldBill[1].field[2].des = `₫${formatNumber(setting.waterPrice)}/m³`),
      (fieldBill[1].field[3].des = `₫${formatNumber(setting.waterPrice)}m³`))
    );
  };
  const handleOpenUpdateChange = (_id) => {
    setDialogTitle("Chỉnh Sửa Hóa Đơn");
    setDialogButton("Cập Nhật Hóa Đơn");
    if (_id) {
      const newUpdateBill = bill.find((item) => item._id === _id);
      setPayLoad({
        ...newUpdateBill,
        _id: newUpdateBill._id,
        price: newUpdateBill.roomId.price,
        tenantId: newUpdateBill.tenantId._id,
        roomId: newUpdateBill.roomId._id,
        month: newUpdateBill.month,
        oldElectricityIndex: newUpdateBill.oldElectricityIndex,
        newElectricityIndex: newUpdateBill.newElectricityIndex,
        oldWaterIndex: newUpdateBill.oldWaterIndex,
        newWaterIndex: newUpdateBill.newWaterIndex,
        rent: newUpdateBill.rent,
        status: newUpdateBill.status,
        note: newUpdateBill.note,
      });
      console.log("BILLL UOPPP", newUpdateBill);
    }
    setOpenUpdate(!openUpdate);
  };
  useEffect(() => {
    fetchTenant();
    fetchRoom();
    fetchBill();
    fetchSetting();
  }, []);
  useEffect(() => {
    setFieldBill(
      [...fieldBill],
      (fieldBill.find(
        (item) => item.group === "Thông Tin Cơ Bản"
      ).field[0].list = tenant.map((itemTenant) => ({
        label: itemTenant.name,
        value: itemTenant._id,
      })))
    );
  }, [tenant]);
  useEffect(() => {
    setFieldBill(
      [...fieldBill],
      (fieldBill.find(
        (item) => item.group === "Thông Tin Cơ Bản"
      ).field[1].list = tenant.find(
        (itemTenant) =>
          itemTenant._id === payload.tenantId && itemTenant.roomId !== null
      )
        ? [
            {
              label: tenant.find(
                (itemTenant) => itemTenant._id === payload.tenantId
              ).roomId.name,
              value: tenant.find(
                (itemTenant) => itemTenant._id === payload.tenantId
              ).roomId._id,
            },
          ]
        : [
            {
              label: "Chưa thuê phòng",
              value: Date.now(),
            },
          ])
    );
    setPayLoad({
      ...payload,
      rent: tenant.find(
        (itemTenant) =>
          itemTenant._id === payload.tenantId && itemTenant.roomId !== null
      )
        ? room.find(
            (itemRoom) =>
              itemRoom._id ===
              tenant.find((itemTenant) => itemTenant._id === payload.tenantId)
                .roomId._id
          )?.price || 0
        : 0,
      roomId: tenant.find(
        (itemTenant) =>
          itemTenant._id === payload.tenantId && itemTenant.roomId !== null
      )
        ? {
            name: tenant.find(
              (itemTenant) => itemTenant._id === payload.tenantId
            ).roomId.name,
            _id: tenant.find(
              (itemTenant) => itemTenant._id === payload.tenantId
            ).roomId._id,
          }
        : null,
    });
  }, [payload.tenantId]);
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
  const fetchSetting = async () => {
    try {
      const response = await getSettings();
      setSetting(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch settings", {
        style: { background: "#333", color: "#fff" },
      });
    }
  };
  const fetchTenant = async () => {
    try {
      setLoading(true);
      const response = await getTenant();
      setTenant(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch tenants", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchBill = async () => {
    try {
      setLoading(true);
      const response = await getBills();
      setBill(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
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
        tenantId: payload.tenantId,
        roomId: payload.roomId._id,
        month: payload.month,
        oldElectricityIndex: payload.oldElectricityIndex,
        newElectricityIndex: payload.newElectricityIndex,
        oldWaterIndex: payload.oldWaterIndex,
        newWaterIndex: payload.newWaterIndex,
        rent: payload.rent,
        status: payload.status,
        note: payload.note,
      };
      await createBill(newPayload);
      toast.success("Thêm hóa đơn mới thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchBill();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
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
        tenantId: payloadUpdate.tenantId,
        roomId: payloadUpdate.roomId._id,
        month: payloadUpdate.month,
        oldElectricityIndex: payloadUpdate.oldElectricityIndex,
        newElectricityIndex: payloadUpdate.newElectricityIndex,
        oldWaterIndex: payloadUpdate.oldWaterIndex,
        newWaterIndex: payloadUpdate.newWaterIndex,
        rent: payloadUpdate.rent,
        status: payloadUpdate.status,
        note: payloadUpdate.note,
      };
      await updateBill(_id, newPayload);
      toast.success("Cập nhật hóa đơn thành công", {
        style: { background: "#333", color: "#fff" },
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingButton(false);
      const response = await getBills();
      setBill(response.data.data);
    }
  };
  const handleChangeStatus = async (_id, key) => {
    try {
      setLoadingChangeStatus(key);
      const newUpdateBill = bill.find((item) => item._id === _id);
      console.log("newssss", newUpdateBill);
      const newPayLoad = {
        ...newUpdateBill,
        status: newUpdateBill.status === "paid" ? "unpaid" : "paid",
        roomId: newUpdateBill.roomId._id,
        tenantId: newUpdateBill.tenantId._id,
      };
      await updateBill(_id, newPayLoad);
      toast.success("Cập nhật status thành công", {
        style: { background: "#333", color: "#fff" },
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingChangeStatus("");
      const response = await getBills();
      setBill(response.data.data);
    }
  };

  const handleDelete = async (id, key) => {
    try {
      setLoadingDelete(key);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await deleteBill(id);
      toast.success("Xóa hóa đơn thành công", {
        style: { background: "#333", color: "#fff" },
      });
      fetchBill();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.error || "Failed to fetch bills", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingDelete("");
    }
  };

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Bills Management"
        des="Track and manage rental bills"
        button="Create bill"
        titleDialog="Tạo Hóa Đơn Mới"
        form={fieldBill}
        setPayload={setPayLoad}
        payload={payload}
        handleCreate={handleCreate}
        loadingButton={loadingButton}
        openCreate={openCreate}
        handleOpenCreateChange={handleOpenCreateChange}
        dialogButton={dialogButton}
      />
      <ManagementTable
        title="All Bill"
        data={bill}
        tbHeader={tableHeader}
        form={fieldBill}
        loading={loading}
        loadingButton={loadingButton}
        openUpdate={openUpdate}
        handleOpenUpdateChange={handleOpenUpdateChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        setPayload={setPayLoad}
        payload={payload}
        titleDialog={dialogTitle}
        loadingDelete={loadingDelete}
        loadingChangeStatus={loadingChangeStatus}
        dialogButton={dialogButton}
        handleChangeStatus={handleChangeStatus}
      />
    </div>
  );
};

export default BillsPage;
