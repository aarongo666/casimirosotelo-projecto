import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { envios } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async (req: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { nombre, telefono, producto, origen, destino, km, costo, factura, fecha } = body;

    if (!nombre || !telefono || !producto || !origen || !destino || !km || !costo || !factura || !fecha) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), { status: 400, headers });
    }

    const [envio] = await db
      .insert(envios)
      .values({ nombre, telefono, producto, origen, destino, km: Number(km), costo: Number(costo), factura: Number(factura), fecha })
      .returning();

    return new Response(JSON.stringify(envio), { status: 201, headers });
  }

  if (req.method === "GET") {
    const adminPassword = req.headers.get("x-admin-password");
    if (adminPassword !== "1234") {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers });
    }
    const todos = await db.select().from(envios).orderBy(desc(envios.creadoEn)).limit(50);
    return new Response(JSON.stringify(todos), { status: 200, headers });
  }

  return new Response(JSON.stringify({ error: "Método no permitido" }), { status: 405, headers });
};

export const config: Config = {
  path: "/api/envios",
};
