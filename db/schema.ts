import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const envios = pgTable("envios", {
  id: serial().primaryKey(),
  factura: integer("factura").notNull(),
  nombre: text("nombre").notNull(),
  telefono: text("telefono").notNull(),
  producto: text("producto").notNull(),
  origen: text("origen").notNull(),
  destino: text("destino").notNull(),
  km: integer("km").notNull(),
  costo: integer("costo").notNull(),
  fecha: text("fecha").notNull(),
  creadoEn: timestamp("creado_en").defaultNow(),
});
