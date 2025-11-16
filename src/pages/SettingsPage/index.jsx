import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Droplet,
  Droplets,
  LoaderCircle,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSettings, updateSetting } from "@/services/api/setting";
import toast from "react-hot-toast";
const SettingsPage = () => {
  const [setting, setSetting] = useState({});
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    fetchSetting();
  }, []);
  useEffect(() => {
    if (setting) {
      setValue(setting);
    }
  }, [setting]);
  const fetchSetting = async () => {
    try {
      setLoading(true);
      const response = await getSettings();
      setSetting(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch settings", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };
  const setValueInput = (name, e) => {
    setValue({ ...value, [name]: +e.target.value });
  };
  const handleSave = async () => {
    try {
      setLoadingButton(true);
      await updateSetting(value);
      toast.success("Update settings successfully", {
        style: { background: "#333", color: "#fff" },
      }, fetchSetting());
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch settings", {
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoadingButton(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your system preferences and pricing
        </p>
      </div>
      <Card>
        <CardHeader className={`${loading === true ? "hidden" : ""}`}>
          <CardTitle>Pricing Configuration</CardTitle>
          <CardDescription>
            Set the pricing for utilities and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading === true ? (
            <div className="flex justify-center items-center h-[20vh]">
              <LoaderCircle className="animate-spin " />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label className="font-medium text-sm flex gap-2 items-center">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Electricity Price (₫/kWh)
                </Label>
                <Input
                  value={value.electricityPrice}
                  onChange={(e) => setValueInput("electricityPrice", e)}
                />
                <p className="text-muted-foreground text-sm">
                  Price per kilowatt-hour (kWh)
                </p>
              </div>
              <div className="grid gap-2">
                <Label className="font-medium text-sm flex gap-2 items-center">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  Water Price (₫/m³)
                </Label>
                <Input
                  value={value.waterPrice}
                  onChange={(e) => setValueInput("waterPrice", e)}
                />
                <p className="text-muted-foreground text-sm">
                  Price per cubic meter (m³)
                </p>
              </div>
              <div className="grid gap-2">
                <Label className="font-medium text-sm flex gap-2 items-center">
                  <Wifi className="w-4 h-4 text-purple-500" />
                  Internet Fee (₫/month)
                </Label>
                <Input
                  value={value.internetFee}
                  onChange={(e) => setValueInput("internetFee", e)}
                />
                <p className="text-muted-foreground text-sm">
                  Monthly internet subscription fee
                </p>
              </div>
              <div className="grid gap-2">
                <Label className="font-medium text-sm flex gap-2 items-center">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Cleaning Fee (₫/month) - Optional
                </Label>
                <Input
                  value={value.cleaningFee}
                  onChange={(e) => setValueInput("cleaningFee", e)}
                />
                <p className="text-muted-foreground text-sm">
                  Monthly cleaning service fee (optional)
                </p>
              </div>
              <Button
                disabled={loadingButton}
                onClick={() => handleSave()}
                className="w-full"
              >
                {loadingButton === true ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Saving ...
                  </div>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
