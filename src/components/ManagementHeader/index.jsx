import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Dialog } from "@radix-ui/react-dialog";
import DialogManagement from "../DialogManagement";

const ManagementHeader = ({
  title,
  des,
  button,
  titleDialog,
  form,
  handleFilter,
  payload,
  setPayload,
  handleCreate,
  loadingButton,
  openCreate,
  handleOpenCreateChange,
  dialogButton
}) => {
  console.log("form", form);
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{des}</p>
        </div>
        <Button onClick={() => handleOpenCreateChange(true)}>
          <Plus className="w-4 h-4" />
          {button}
        </Button>
      </div>
      <Card className={`gap-2 ${title === "Bills Management" ? "hidden" : ""}`}>
        <CardHeader>
          <div className="leading-none font-semibold">
            Search {title === "Rooms Management" ? "Rooms" : "Tenants"}
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <Input
            onChange={(e) => handleFilter(e.target.value)}
            placeholder={`Search by ${
              title === "Rooms Management" ? "room name" : "name or phone"
            }...`}
            className="max-w-sm"
          />
        </CardContent>
      </Card>
      <DialogManagement
        open={openCreate}
        onOpenChange={handleOpenCreateChange}
        titleDialog={titleDialog}
        form={form}
        payload={payload}
        setPayload={setPayload}
        handle={handleCreate}
        loadingButton={loadingButton}
        dialogButton={dialogButton}
      />
    </>
  );
};

export default ManagementHeader;
