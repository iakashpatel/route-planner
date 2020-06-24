const getLatLngFromAddress = async (q, limit = "1") => {
  const params = new URLSearchParams({
    q,
    limit,
    format: "json"
  });

  const ENDPOINT = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
  const payload = await fetch(ENDPOINT).then((res) => res.json());

  if (!payload || !payload.length) {
    throw new Error(`No response for Address: ${q}`);
  }
  return `${payload[0].lat},${payload[0].lon}`;
};

export { getLatLngFromAddress };
