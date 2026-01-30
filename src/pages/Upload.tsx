import { useState } from "react";
import {
  Upload as UploadIcon,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type Status = "idle" | "uploading" | "success" | "error";

export default function Upload() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");

  const [formData, setFormData] = useState({
    dcrush_date: "",
    nday_gross_cane: "",
    total_sugar: "",
    nexpected_recovery_prc_cane: "",
    nworking_hrs: "",
    nbagasse_prc_cane: "",
    factory_id: "FACTORY_001"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpload = async () => {
    // 🔒 Basic validation
    if (!formData.dcrush_date) {
      toast({ title: "Date required", variant: "destructive" });
      return;
    }

    setStatus("uploading");

    try {
      const res = await fetch(
        "https://dmr-backend.onrender.com/api/dmr/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dcrush_date: formData.dcrush_date,
            nday_gross_cane: Number(formData.nday_gross_cane),
            total_sugar: Number(formData.total_sugar),
            nexpected_recovery_prc_cane: Number(formData.nexpected_recovery_prc_cane),
            nworking_hrs: Number(formData.nworking_hrs),
            nbagasse_prc_cane: Number(formData.nbagasse_prc_cane),
            factory_id: formData.factory_id
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Upload failed");
      }

      setStatus("success");
      toast({
        title: "Upload Successful",
        description: "DMR data stored and dashboard updated"
      });
    } catch (err: any) {
      setStatus("error");
      toast({
        title: "Upload Failed",
        description: err.message || "Backend error",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {t.upload.title}
      </h1>

      <div className="bg-card border rounded-xl p-6 space-y-4">
        <Input
          type="date"
          name="dcrush_date"
          value={formData.dcrush_date}
          onChange={handleChange}
        />

        <Input
          name="nday_gross_cane"
          value={formData.nday_gross_cane}
          placeholder="Gross Cane (Tons)"
          onChange={handleChange}
        />

        <Input
          name="total_sugar"
          value={formData.total_sugar}
          placeholder="Total Sugar (Tons)"
          onChange={handleChange}
        />

        <Input
          name="nexpected_recovery_prc_cane"
          value={formData.nexpected_recovery_prc_cane}
          placeholder="Expected Recovery (%)"
          onChange={handleChange}
        />

        <Input
          name="nworking_hrs"
          value={formData.nworking_hrs}
          placeholder="Working Hours"
          onChange={handleChange}
        />

        <Input
          name="nbagasse_prc_cane"
          value={formData.nbagasse_prc_cane}
          placeholder="Bagasse (%)"
          onChange={handleChange}
        />

        {status === "uploading" && (
          <Button disabled className="w-full gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Uploading...
          </Button>
        )}

        {status === "idle" && (
          <Button onClick={handleUpload} className="w-full gap-2">
            <UploadIcon className="h-4 w-4" />
            Upload DMR
          </Button>
        )}

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 /> Upload successful
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle /> Upload failed
          </div>
        )}
      </div>
    </div>
  );
}
