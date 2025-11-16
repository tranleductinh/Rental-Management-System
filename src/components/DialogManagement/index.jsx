import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import SelectStatus from "../SelectStatus";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoaderCircle } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import MonthYearPicker from "../MonthYearPicker.jsx";
import { formatMonth } from "@/untils/managementRental";

const DialogManagement = ({
  open,
  onOpenChange,
  titleDialog,
  form,
  setPayload,
  handle,
  loadingButton,
  payload,
  dialogButton,
}) => {
  const [valueEdit, setValueEdit] = useState({});

  console.log("payload", payload);
  const handleClose = async (id, payload) => {
    await handle(id, payload);
    onOpenChange(false);
  };
  const handleSetValue = (itemField, v) => {
    setValueEdit({
      ...valueEdit,
      [itemField.name]:
        itemField.type === "number" ? +v.target.value : v.target.value,
    });
    setPayload({
      ...payload,
      [itemField.name]:
        itemField.type === "number" ? +v.target.value : v.target.value,
    });
  };
  useEffect(() => {
    if (payload) {
      setValueEdit(payload);
    }
  }, [payload]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {titleDialog}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className={`space-y-5 `}>
              {form.map((item, key) => (
                <div
                  className={`space-y-4 ${
                    key > 0 && item.group ? "pt-2 border-t" : ""
                  }`}
                >
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {item.group}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {item.field.map((itemField) => (
                      <div
                        className={`grid gap-2 ${
                          itemField.kind === "textarea" ||
                          itemField.label === "Tháng *" ||
                          itemField.label === "Tên Phòng *"
                            ? "col-span-2"
                            : ""
                        }`}
                      >
                        <Label className="font-medium text-sm leading-none">
                          {itemField.label}
                        </Label>
                        {itemField.kind === "select" ? (
                          <SelectStatus
                            list={itemField.list}
                            onValueChange={(e) => {
                              setPayload({
                                ...payload,
                                [itemField.name]:
                                  itemField.kind === "select" &&
                                  itemField.name === "roomId"
                                    ? {
                                        name: itemField.list.find(
                                          (item) => item.value === e
                                        ).label,
                                        _id: e,
                                      }
                                    : e,
                              });
                              setValueEdit({
                                ...valueEdit,
                                [itemField.name]:
                                  itemField.kind === "select" &&
                                  itemField.name === "roomId"
                                    ? {
                                        name: itemField.list.find(
                                          (item) => item.value === e
                                        ).label,
                                        _id: e,
                                      }
                                    : e,
                              });
                            }}
                            valueSelect={
                              itemField.name === "roomId"
                                ? valueEdit?.roomId?._id || ""
                                : valueEdit[itemField.name] || ""
                            }
                          />
                        ) : itemField.kind === "input" ? (
                          <>
                            <Input
                              className="w-full"
                              type={itemField.type}
                              placeholder={itemField.place_holder}
                              value={valueEdit[itemField.name] || ""}
                              onChange={(e) => handleSetValue(itemField, e)}
                            ></Input>
                            <p
                              className={`${
                                item.group === "Chỉ Số Điện Nước"
                                  ? "text-muted-foreground text-sm"
                                  : "hidden"
                              }`}
                            >
                              {itemField.des}
                            </p>
                          </>
                        ) : itemField.kind === "textarea" ? (
                          <Textarea
                            className="h-24"
                            placeholder={itemField.place_holder}
                            value={valueEdit[itemField.name] || ""}
                            onChange={(e) => handleSetValue(itemField, e)}
                          ></Textarea>
                        ) : itemField.kind === "month" ? (
                          <DatePicker
                            selected={
                              valueEdit[itemField.name]
                                ? new Date(valueEdit[itemField.name])
                                : null
                            }
                            onChange={(date) =>
                              handleSetValue(itemField, {
                                target: { value: formatMonth(date) },
                              })
                            }
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            className="border rounded px-3 py-2 w-full"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t bg-muted/30 px-6 py-4 mt-auto">
            <Button
              disabled={loadingButton}
              onClick={() => handleClose(payload._id, payload)}
              className="w-full !h-[44px]"
            >
              {loadingButton ? (
                <div className="flex items-center gap-1">
                  <LoaderCircle className="animate-spin" />
                  {dialogButton} . . .
                </div>
              ) : (
                <div>{dialogButton}</div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogManagement;
