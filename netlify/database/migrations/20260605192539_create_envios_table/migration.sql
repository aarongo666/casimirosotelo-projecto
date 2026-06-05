CREATE TABLE "envios" (
	"id" serial PRIMARY KEY,
	"factura" integer NOT NULL,
	"nombre" text NOT NULL,
	"telefono" text NOT NULL,
	"producto" text NOT NULL,
	"origen" text NOT NULL,
	"destino" text NOT NULL,
	"km" integer NOT NULL,
	"costo" integer NOT NULL,
	"fecha" text NOT NULL,
	"creado_en" timestamp DEFAULT now()
);
