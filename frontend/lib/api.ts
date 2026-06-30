// frontend/lib/api.ts

// 1. Correctly reading the environment variable from Next.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 2. A master response handler that catches HTML pages safely
const handleResponse = async (res: Response) => {
  // Read the raw text from the server FIRST, before trying to force it into JSON
  const text = await res.text();
  
  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.message || `Sunucu Hatası: ${res.status}`);
    }
    return data;
  } catch (err: any) {
    // If JSON.parse fails, it means the server sent us HTML or crashed!
    if (err.name === "SyntaxError") {
      console.error("🚨 GİZLİ SUNUCU HATASI (RAW HTML):", text);
      throw new Error(`Sunucu geçersiz bir yanıt döndürdü (Hata Kodu: ${res.status}). Lütfen F12 Konsoluna bakın.`);
    }
    throw err;
  }
};

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { cache: "no-store" });
    return handleResponse(res);
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async patch(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async delete(endpoint: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file); // Ensure this matches your NestJS controller 'file'

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(res);
  },
};