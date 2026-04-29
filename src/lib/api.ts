const API_BASE = "https://dmr-backend.onrender.com";

function getFactoryCode() {
  return localStorage.getItem("factory_code");
}

export async function fetchDMRData(limit = 7) {
  const factoryCode = getFactoryCode();

  const res = await fetch(
    `${API_BASE}/dmr_data?limit=${limit}&factory_code=${factoryCode}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch DMR data");
  }

  return res.json();
}