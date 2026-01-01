import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Download, Calendar } from "lucide-react";
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
import { reportTableData } from "@/lib/mockData";

export default function Reports() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = reportTableData.filter(item =>
    item.date.includes(searchTerm) ||
    item.efficiency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "High": return "bg-success/10 text-success border-success/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTranslatedEfficiency = (efficiency: string) => {
    switch (efficiency) {
      case "High": return t.dashboard.status.high;
      case "Medium": return t.dashboard.status.medium;
      case "Low": return t.dashboard.status.low;
      default: return efficiency;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t.reports.title}</h1>
          <p className="text-muted-foreground mt-1">{t.reports.subtitle}</p>
        </div>
        <Button variant="outline" className="gap-2 w-fit">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 border border-border shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.reports.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">{t.reports.table.date}</TableHead>
                <TableHead className="font-semibold text-right">{t.reports.table.caneCrushed}</TableHead>
                <TableHead className="font-semibold text-right">{t.reports.table.sugarProduced}</TableHead>
                <TableHead className="font-semibold text-right">{t.reports.table.recovery}</TableHead>
                <TableHead className="font-semibold text-center">{t.reports.table.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow 
                    key={row.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium">{row.date}</TableCell>
                    <TableCell className="text-right">{row.caneCrushed.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.sugarProduced.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.recovery}%</TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                        getEfficiencyColor(row.efficiency)
                      )}>
                        {getTranslatedEfficiency(row.efficiency)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No records found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t.reports.pagination.showing} {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} {t.reports.pagination.of} {filteredData.length} {t.reports.pagination.results}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}