import { useState, useCallback } from "react";
import { 
  Upload as UploadIcon, 
  FileSpreadsheet, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  CloudUpload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function Upload() {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];
    const validExtensions = [".csv", ".xlsx", ".xls"];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    return hasValidType || hasValidExtension;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile({
          name: droppedFile.name,
          size: droppedFile.size,
          type: droppedFile.type
        });
        setStatus("idle");
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .csv or .xlsx file",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type
        });
        setStatus("idle");
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .csv or .xlsx file",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");

    // Simulate API call to POST /api/upload-report
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated success (in real app, would call backend API)
      // const formData = new FormData();
      // formData.append('file', file);
      // await fetch('/api/upload-report', { method: 'POST', body: formData });
      
      setStatus("success");
      toast({
        title: "Upload successful!",
        description: "Data will be processed by backend. Dashboard will update shortly."
      });
    } catch {
      setStatus("error");
      toast({
        title: "Upload failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const resetUpload = () => {
    setFile(null);
    setStatus("idle");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t.upload.title}</h1>
        <p className="text-muted-foreground mt-1">
          {t.upload.subtitle}
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        {!file ? (
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 lg:p-12 transition-all duration-300 text-center",
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              accept=".csv,.xlsx,.xls"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center">
              <div className={cn(
                "p-4 rounded-full mb-4 transition-colors",
                dragActive ? "bg-primary/20" : "bg-muted"
              )}>
                <CloudUpload className={cn(
                  "h-10 w-10 transition-colors",
                  dragActive ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {t.upload.dropzone}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t.upload.formats}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Supported formats: .csv, .xlsx, .xls</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Preview */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              {status === "idle" && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={resetUpload}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {status === "uploading" && (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle2 className="h-5 w-5 text-success" />
              )}
              {status === "error" && (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Upload Successful!</p>
                    <p className="text-sm text-success/80 mt-1">
                      Data will be processed by backend. Please wait for dashboard update.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Upload Failed</p>
                    <p className="text-sm text-destructive/80 mt-1">
                      There was an error processing your file. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {status === "idle" && (
                <>
                  <Button onClick={handleUpload} className="flex-1 gap-2">
                    <UploadIcon className="h-4 w-4" />
                    Upload to Server
                  </Button>
                  <Button variant="outline" onClick={resetUpload}>
                    Cancel
                  </Button>
                </>
              )}
              {status === "uploading" && (
                <Button disabled className="flex-1 gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </Button>
              )}
              {(status === "success" || status === "error") && (
                <Button onClick={resetUpload} variant="outline" className="flex-1">
                  Upload Another File
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-3">Upload Guidelines</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            File will be sent directly to backend API endpoint (POST /api/upload-report)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Backend handles all validation and data processing
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Dashboard will auto-update once processing completes
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Maximum file size: 10MB
          </li>
        </ul>
      </div>
    </div>
  );
}