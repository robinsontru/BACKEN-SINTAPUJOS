
CREATE TABLE IF NOT EXISTS public.cita
(
    cita_id integer NOT NULL DEFAULT nextval('cita_cita_id_seq'::regclass),
    fecha timestamp with time zone,
    hora_id time without time zone,
    descripcion character varying(255) COLLATE pg_catalog."default",
    n_documento bigint,
    "citaeliminadaCitaId" integer,
    CONSTRAINT cita_pkey PRIMARY KEY (cita_id)
);

CREATE TABLE IF NOT EXISTS public.citaeliminadas
(
    cita_id integer NOT NULL DEFAULT nextval('citaeliminadas_cita_id_seq'::regclass),
    fecha timestamp with time zone,
    hora_id time without time zone,
    descripcion character varying(255) COLLATE pg_catalog."default",
    n_documento bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT citaeliminadas_pkey PRIMARY KEY (cita_id)
);

CREATE TABLE IF NOT EXISTS public.comentarios
(
    "id_Comentarios" integer NOT NULL DEFAULT nextval('"comentarios_id_Comentarios_seq"'::regclass),
    n_documento bigint,
    comentario text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "personaIdPersona" integer,
    CONSTRAINT comentarios_pkey PRIMARY KEY ("id_Comentarios")
);

CREATE TABLE IF NOT EXISTS public.eventos
(
    "idEvento" integer NOT NULL DEFAULT nextval('"eventos_idEvento_seq"'::regclass),
    nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    imagen bytea NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT eventos_pkey PRIMARY KEY ("idEvento")
);

CREATE TABLE IF NOT EXISTS public.juegos
(
    id_juego integer NOT NULL,
    nombre character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT juegos_pkey PRIMARY KEY (id_juego)
);

CREATE TABLE IF NOT EXISTS public.personas
(
    id_persona integer NOT NULL DEFAULT nextval('personas_id_persona_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    apellido character varying(50) COLLATE pg_catalog."default" NOT NULL,
    tipo_documento enum_personas_tipo_documento NOT NULL,
    n_documento bigint NOT NULL,
    n_ficha integer,
    telefono bigint NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    contrasena character varying(255) COLLATE pg_catalog."default" NOT NULL,
    rol enum_personas_rol,
    "codigoRecuperar" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "citumCitaId" integer,
    "eventoIdEvento" integer,
    CONSTRAINT personas_pkey PRIMARY KEY (id_persona)
);

ALTER TABLE IF EXISTS public.cita
    ADD CONSTRAINT "cita_citaeliminadaCitaId_fkey" FOREIGN KEY ("citaeliminadaCitaId")
    REFERENCES public.citaeliminadas (cita_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.comentarios
    ADD CONSTRAINT "comentarios_personaIdPersona_fkey" FOREIGN KEY ("personaIdPersona")
    REFERENCES public.personas (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.personas
    ADD CONSTRAINT "personas_citumCitaId_fkey" FOREIGN KEY ("citumCitaId")
    REFERENCES public.cita (cita_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.personas
    ADD CONSTRAINT "personas_eventoIdEvento_fkey" FOREIGN KEY ("eventoIdEvento")
    REFERENCES public.eventos ("idEvento") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;