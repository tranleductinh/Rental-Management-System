import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
import BadgeStatus from "../BadgeStatus";
import { Dialog } from "@radix-ui/react-dialog";
import DialogManagement from "../DialogManagement";
import { formatNumber, getValueByPath } from "@/untils/managementRental";
const ManagementTable = ({
  title,
  data,
  tbHeader,
  loading,
  openUpdate,
  form,
  titleDialog,
  payload,
  setPayload,
  handleUpdate,
  loadingButton,
  handleOpenUpdateChange,
  handleDelete,
  loadingDelete,
  loadingChangeStatus,
  handleChangeStatus,
  dialogButton,
}) => {
  console.log("tbHeader", tbHeader);
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="leading-none font-semibold">{title}</div>
        </CardHeader>
        <CardContent className="px-6">
          <div
            className={` ${
              loading === true
                ? "flex justify-center items-center py-12"
                : "rounded-lg border"
            } `}
          >
            <LoaderCircle
              className={`${
                loading === true ? "animate-spin w-8 h-8" : "hidden"
              }`}
            />
            <div className={`${loading === false ? "" : "hidden"}`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    {tbHeader.map((item) => (
                      <TableHead>{item.name}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {data.length > 0 ? (
                  <TableBody>
                    {data.map((item, key) => (
                      <TableRow>
                        {tbHeader.map((itemHeader) => (
                          <TableCell>
                            {itemHeader.title === "status" ? (
                              item[itemHeader.title] === "paid" ||
                              item[itemHeader.title] === "unpaid" ? (
                                <Button
                                  disabled={
                                    loadingChangeStatus === key ? true : false
                                  }
                                  onClick={() =>
                                    handleChangeStatus(item._id, key, payload)
                                  }
                                  className="bg-transparent hover:bg-transparent p-0"
                                >
                                  <BadgeStatus
                                    index={key}
                                    loadingChangeStatus={loadingChangeStatus}
                                    status={item[itemHeader.title]}
                                  />
                                </Button>
                              ) : (
                                <BadgeStatus status={item[itemHeader.title]} />
                              )
                            ) : (
                              <div
                                className={`${
                                  itemHeader.title === "total"
                                    ? "font-semibold"
                                    : ""
                                }`}
                              >
                                <span
                                  className={`${
                                    itemHeader.title === "price" ||
                                    itemHeader.title === "total"
                                      ? ""
                                      : "hidden"
                                  }`}
                                >
                                  $
                                </span>
                                {itemHeader.title === "price" ||
                                itemHeader.title === "total" ? (
                                  formatNumber(
                                    getValueByPath(item, itemHeader.title)
                                  )
                                ) : itemHeader.title === "roomId.name" ? (
                                  <div className="text-green-600">
                                    {getValueByPath(item, itemHeader.title)}
                                  </div>
                                ) : itemHeader.name === "Breakdown" ? (
                                  <div className="text-xs spacy-y-0.5">
                                    {itemHeader.title.map((i) => (
                                      <div>
                                        {i.name}:{" ₫"}
                                        {i.title === "electricityPrice" || i.title === "waterPrice" ? formatNumber(item[i.title] * (item[i.new] - item[i.old])) : formatNumber(item[i.title])}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  getValueByPath(item, itemHeader.title)
                                )}
                              </div>
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              disabled={loadingDelete === key ? true : false}
                              onClick={() => handleOpenUpdateChange(item._id)}
                              className="bg-transparent hover:text-accent-foreground hover:bg-accent"
                            >
                              <SquarePen className="text-blue-600" />
                            </Button>
                            <Button
                              disabled={loadingDelete === key ? true : false}
                              onClick={() =>
                                alert(
                                  "Are you sure you want to delete this room?",
                                  handleDelete(item._id, key)
                                )
                              }
                              className="bg-transparent hover:text-accent-foreground hover:bg-accent"
                            >
                              {loadingDelete === key ? (
                                <LoaderCircle className="text-red-600 animate-spin" />
                              ) : (
                                <Trash2 className="text-red-600" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={tbHeader.length + 1}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Not found.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <DialogManagement
        open={openUpdate}
        onOpenChange={handleOpenUpdateChange}
        titleDialog={titleDialog}
        form={form}
        payload={payload}
        setPayload={setPayload}
        handle={handleUpdate}
        loadingButton={loadingButton}
        dialogButton={dialogButton}
      />
    </div>
  );
};

export default ManagementTable;
