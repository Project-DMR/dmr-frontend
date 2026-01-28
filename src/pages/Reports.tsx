import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const API_URL = "https://dmr-backend.onrender.com/dmr_data";

export default function Reports() {
  const { t } = useLanguage();

  const [rows, setRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRows(data.data || []))
      .catch(console.error);
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = rows.filter(row => {
    const matchesDate =
      selectedDate === "" || row.dcrush_date === selectedDate;

    const search = searchTerm.trim();
    const matchesSearch =
      search === "" ||
      String(row.nday_gross_cane || "").includes(search) ||
      String(row.total_sugar || "").includes(search) ||
      String(row.nexpected_recovery_prc_cane || "").includes(search);

    return matchesDate && matchesSearch;
  });

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDate]);

  /* ---------------- EXPORT CSV ---------------- */
  const exportCSV = () => {
    const headers = [
      "Date",
      "Cane Crushed",
      "Sugar Produced",
      "Recovery %"
    ];

    const csvRows = [
      headers.join(","),
      ...filteredData.map(r =>
        [
          r.dcrush_date,
          r.nday_gross_cane,
          r.total_sugar,
          r.nexpected_recovery_prc_cane
        ].join(",")
      )
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dmr_report.csv";
    a.click();
  };

  /* ---------------- EFFICIENCY TAG ---------------- */
  const getEfficiency = (recovery: number) => {
    if (recovery >= 10.8) return "High";
    if (recovery >= 10.2) return "Medium";
    return "Low";
  };

  const getEfficiencyColor = (status: string) => {
    switch (status) {
      case "High":
        return "bg-success/10 text-success border-success/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t.reports.title}</h1>
          <p className="text-muted-foreground">{t.reports.subtitle}</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* FILTERS */}
      <div className="bg-card p-4 rounded-xl border shadow-card flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cane, sugar, recovery…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Cane Crushed</TableHead>
              <TableHead className="text-right">Sugar Produced</TableHead>
              <TableHead className="text-right">Recovery %</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((row, i) => {
              const status = getEfficiency(
                Number(row.nexpected_recovery_prc_cane)
              );

              return (
                <TableRow key={i}>
                  <TableCell>{row.dcrush_date}</TableCell>
                  <TableCell className="text-right">
                    {row.nday_gross_cane}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.total_sugar}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.nexpected_recovery_prc_cane}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs border",
                      getEfficiencyColor(status)
                    )}>
                      {status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 border-t">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages || 1}
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
