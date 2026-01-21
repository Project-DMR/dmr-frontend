const API_BASE = "http://localhost:9000";

export async function fetchDMRData(limit = 7) {
  const res = await fetch(`${API_BASE}/dmr_data?limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch DMR data");
  }
  return res.json();
}
