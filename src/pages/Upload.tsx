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

type Status = "idle" | "uploading" | "success" | "error";

export default function Upload() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");

  const [formData, setFormData] = useState({
    dcrush_date: "",

    nday_gross_cane: "",
    nworking_hrs: "",
    ntotal_hrs_lost: "",

    total_sugar: "",
    nexpected_recovery_prc_cane: "",
    ntotal_losses: "",

    nfibre_prc_cane: "",
    nbagasse_prc_cane: "",
    nbagasse_pol: "",
    nmoisture_prc_bagasse: "",
    nmill_extraction: "",

    nbrix_prc_pj: "",
    npol_prc_pj: "",
    npurity_of_pj: "",
    nbrix_prc_mj: "",
    npol_prc_mj: "",
    npurity_of_mj: "",

    mechanical_electrical: "",
    nhrslost_cane_shortage: "",
    nhrslost_cleaning: "",
    nhrslost_rain: "",
    nhrslost_misc: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpload = async () => {
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
            ...formData,

            nday_gross_cane: Number(formData.nday_gross_cane || 0),
            nworking_hrs: Number(formData.nworking_hrs || 0),
            ntotal_hrs_lost: Number(formData.ntotal_hrs_lost || 0),

            total_sugar: Number(formData.total_sugar || 0),
            nexpected_recovery_prc_cane: Number(formData.nexpected_recovery_prc_cane || 0),
            ntotal_losses: Number(formData.ntotal_losses || 0),

            nfibre_prc_cane: Number(formData.nfibre_prc_cane || 0),
            nbagasse_prc_cane: Number(formData.nbagasse_prc_cane || 0),
            nbagasse_pol: Number(formData.nbagasse_pol || 0),
            nmoisture_prc_bagasse: Number(formData.nmoisture_prc_bagasse || 0),
            nmill_extraction: Number(formData.nmill_extraction || 0),

            nbrix_prc_pj: Number(formData.nbrix_prc_pj || 0),
            npol_prc_pj: Number(formData.npol_prc_pj || 0),
            npurity_of_pj: Number(formData.npurity_of_pj || 0),
            nbrix_prc_mj: Number(formData.nbrix_prc_mj || 0),
            npol_prc_mj: Number(formData.npol_prc_mj || 0),
            npurity_of_mj: Number(formData.npurity_of_mj || 0),

            mechanical_electrical: Number(formData.mechanical_electrical || 0),
            nhrslost_cane_shortage: Number(formData.nhrslost_cane_shortage || 0),
            nhrslost_cleaning: Number(formData.nhrslost_cleaning || 0),
            nhrslost_rain: Number(formData.nhrslost_rain || 0),
            nhrslost_misc: Number(formData.nhrslost_misc || 0)
          })
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");

      setStatus("success");
      toast({
        title: "Upload Successful",
        description: "DMR data stored and AI recalculated"
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
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">
        DMR Upload
      </h1>

      <div className="bg-card border rounded-xl p-6 space-y-4">

        <Input type="date" name="dcrush_date" value={formData.dcrush_date} onChange={handleChange} />

        <Input name="nday_gross_cane" placeholder="Gross Cane (Tons)" value={formData.nday_gross_cane} onChange={handleChange} />
        <Input name="nworking_hrs" placeholder="Working Hours" value={formData.nworking_hrs} onChange={handleChange} />
        <Input name="ntotal_hrs_lost" placeholder="Total Hours Lost" value={formData.ntotal_hrs_lost} onChange={handleChange} />

        <Input name="total_sugar" placeholder="Total Sugar (Tons)" value={formData.total_sugar} onChange={handleChange} />
        <Input name="nexpected_recovery_prc_cane" placeholder="Expected Recovery (%)" value={formData.nexpected_recovery_prc_cane} onChange={handleChange} />
        <Input name="ntotal_losses" placeholder="Total Losses" value={formData.ntotal_losses} onChange={handleChange} />

        <Input name="nfibre_prc_cane" placeholder="Fibre % Cane" value={formData.nfibre_prc_cane} onChange={handleChange} />
        <Input name="nbagasse_prc_cane" placeholder="Bagasse % Cane" value={formData.nbagasse_prc_cane} onChange={handleChange} />
        <Input name="nbagasse_pol" placeholder="Bagasse Pol %" value={formData.nbagasse_pol} onChange={handleChange} />
        <Input name="nmoisture_prc_bagasse" placeholder="Moisture % Bagasse" value={formData.nmoisture_prc_bagasse} onChange={handleChange} />
        <Input name="nmill_extraction" placeholder="Mill Extraction %" value={formData.nmill_extraction} onChange={handleChange} />

        <Input name="nbrix_prc_pj" placeholder="Brix % PJ" value={formData.nbrix_prc_pj} onChange={handleChange} />
        <Input name="npol_prc_pj" placeholder="Pol % PJ" value={formData.npol_prc_pj} onChange={handleChange} />
        <Input name="npurity_of_pj" placeholder="Purity % PJ" value={formData.npurity_of_pj} onChange={handleChange} />
        <Input name="nbrix_prc_mj" placeholder="Brix % MJ" value={formData.nbrix_prc_mj} onChange={handleChange} />
        <Input name="npol_prc_mj" placeholder="Pol % MJ" value={formData.npol_prc_mj} onChange={handleChange} />
        <Input name="npurity_of_mj" placeholder="Purity % MJ" value={formData.npurity_of_mj} onChange={handleChange} />

        <Input name="mechanical_electrical" placeholder="Mechanical/Electrical Loss" value={formData.mechanical_electrical} onChange={handleChange} />
        <Input name="nhrslost_cane_shortage" placeholder="Hrs Lost Cane Shortage" value={formData.nhrslost_cane_shortage} onChange={handleChange} />
        <Input name="nhrslost_cleaning" placeholder="Hrs Lost Cleaning" value={formData.nhrslost_cleaning} onChange={handleChange} />
        <Input name="nhrslost_rain" placeholder="Hrs Lost Rain" value={formData.nhrslost_rain} onChange={handleChange} />
        <Input name="nhrslost_misc" placeholder="Hrs Lost Misc" value={formData.nhrslost_misc} onChange={handleChange} />

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
