--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO postgres;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    stars integer NOT NULL,
    planets integer NOT NULL,
    size_in_kpc numeric(5,1),
    description text,
    has_elliptical_shape boolean,
    has_spiral_shape boolean
);


ALTER TABLE public.galaxy OWNER TO postgres;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO postgres;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    moons integer NOT NULL,
    mass_in_kg numeric(5,1),
    description text,
    has_life boolean,
    is_galilean boolean
);


ALTER TABLE public.moon OWNER TO postgres;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO postgres;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    moons integer NOT NULL,
    mass_in_kg numeric(5,1),
    description text,
    has_life boolean,
    is_ocean_planet boolean
);


ALTER TABLE public.planet OWNER TO postgres;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO postgres;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: spectral_classification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spectral_classification (
    spectral_classification_id integer NOT NULL,
    name character varying(30) NOT NULL,
    lower_temperature_in_k integer NOT NULL,
    higher_temperature_in_k integer,
    fraction_main_sequence_stars_in_perc numeric(10,5),
    description text,
    weak boolean,
    strong boolean
);


ALTER TABLE public.spectral_classification OWNER TO postgres;

--
-- Name: spectral_classification_spectral_classification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spectral_classification_spectral_classification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spectral_classification_spectral_classification_id_seq OWNER TO postgres;

--
-- Name: spectral_classification_spectral_classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spectral_classification_spectral_classification_id_seq OWNED BY public.spectral_classification.spectral_classification_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    galaxy_id integer NOT NULL,
    spectral_classification_id integer NOT NULL,
    name character varying(30) NOT NULL,
    planets integer NOT NULL,
    mass_in_kg numeric(5,1),
    description text,
    rotates_counterclockwise boolean,
    is_early_type boolean
);


ALTER TABLE public.star OWNER TO postgres;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO postgres;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: spectral_classification spectral_classification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spectral_classification ALTER COLUMN spectral_classification_id SET DEFAULT nextval('public.spectral_classification_spectral_classification_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 100, 800, 26.8, 'the galaxy that includes the Solar System', false, true);
INSERT INTO public.galaxy VALUES (2, 'Andromeda Galaxy', 1000, 0, 765.0, 'Andromeda is the closest big galaxy to the Milky Way and is expected to collide with the Milky Way around 4.5 billion years from now', false, true);
INSERT INTO public.galaxy VALUES (3, 'Backward Galaxy', 100, 0, 26.8, 'It appears to rotate backwards, as the tips of the spiral arms point in the direction of rotation.', false, true);
INSERT INTO public.galaxy VALUES (4, 'Cigar Galaxy', 100, 0, 26.8, 'Appears similar in shape to a cigar.', true, false);
INSERT INTO public.galaxy VALUES (5, 'Needle Galaxy', 100, 0, 26.8, 'Named due to its slender appearance.', true, false);
INSERT INTO public.galaxy VALUES (6, 'Sculptor Galaxy', 100, 0, 26.8, '	Named after its location in the Sculptor Constellation. Also called the Silver Dollar or Silver Coin Galaxy, because of its light and circular appearance.', false, true);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.moon VALUES (1, 3, 'Moon', 0, 7.3, 'always presents the same side to Earth, because gravitational pull has locked its rotation to the planet.', false, false);
INSERT INTO public.moon VALUES (2, 4, 'Phobos', 0, 1.0, 'the innermost and larger of the two natural satellites of Mars.', false, false);
INSERT INTO public.moon VALUES (3, 4, 'Delmos', 0, 1.4, 'he smaller and outermost of the two natural satellites of Mars.', false, false);
INSERT INTO public.moon VALUES (4, 5, 'Metis ', 0, 0.0, 'the innermost known moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (5, 5, 'Adrastea', 0, 0.0, 'the second by distance, and the smallest of the four inner moons of Jupiter.', false, false);
INSERT INTO public.moon VALUES (6, 5, 'Amalthea', 0, 0.0, 'has the third closest orbit around Jupiter among known moons and was the fifth moon of Jupiter to be discovered.', false, false);
INSERT INTO public.moon VALUES (7, 5, 'Thebe', 0, 0.0, 'the fourth of Jupiters moons by distance from the planet.', false, false);
INSERT INTO public.moon VALUES (8, 5, 'Io', 0, 0.0, 'Galilean moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (9, 5, 'Europa', 0, 0.0, 'Galilean moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (10, 5, 'Ganymede', 0, 0.0, 'Galilean moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (11, 5, 'Callisto', 0, 0.0, 'Galilean moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (12, 5, 'Themisto', 0, 0.0, 'the innermost irregular moon and is not part of a known family.', false, false);
INSERT INTO public.moon VALUES (13, 5, 'Leda', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (14, 5, 'Ersa', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (15, 5, 'Himalia', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (16, 5, 'Pandia', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (17, 5, 'Lysithea', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (18, 5, 'Elara', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (19, 5, 'Dia', 0, 0.0, 'Himalia moon of Jupiter.', false, false);
INSERT INTO public.moon VALUES (20, 5, 'Carpo', 0, 0.0, 'small outer natural satellite of Jupiter.', false, false);
INSERT INTO public.moon VALUES (21, 5, 'Ananke', 0, 0.0, 'retrograde irregular satellites of Jupiter.', false, false);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planet VALUES (1, 1, 'Mercury', 0, 3.3, 'the first planet from the Sun and the smallest in the Solar System.', false, false);
INSERT INTO public.planet VALUES (2, 1, 'Venus', 0, 4.8, 'the second planet from the Sun. It has the densest atmosphere of all rocky bodies in the Solar System.', false, false);
INSERT INTO public.planet VALUES (3, 1, 'Earth', 1, 5.9, 'the third planet from the Sun and the only astronomical object known to harbor life.', true, true);
INSERT INTO public.planet VALUES (4, 1, 'Mars', 0, 3.3, 'the fourth planet from the Sun. The surface of Mars is orange-red because it is covered in iron(III) oxide dust.', false, false);
INSERT INTO public.planet VALUES (5, 1, 'Jupiter', 0, 1.9, 'the fifth planet from the Sun and the largest in the Solar System.', false, false);
INSERT INTO public.planet VALUES (6, 1, 'Saturn', 0, 5.6, 'the sixth planet from the Sun and the second-largest in the Solar System.', false, false);
INSERT INTO public.planet VALUES (7, 1, 'Uranus', 0, 8.6, 'the seventh planet from the Sun.', false, false);
INSERT INTO public.planet VALUES (8, 1, 'Neptune', 0, 1.0, 'the eighth and farthest planet from the Sun.', false, false);
INSERT INTO public.planet VALUES (9, 1, 'Ceres', 0, 0.0, 'dwarf planet in the middle main asteroid belt between the orbits of Mars and Jupiter.', false, false);
INSERT INTO public.planet VALUES (10, 1, 'Orcus', 0, 0.0, 'large trans-Neptunian object with a large moon, Vanth', false, false);
INSERT INTO public.planet VALUES (11, 1, 'Pluto', 0, 0.0, 'dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.', false, false);
INSERT INTO public.planet VALUES (12, 1, 'Haumea', 0, 0.0, 'dwarf planet located beyond Neptunes orbit.', false, false);


--
-- Data for Name: spectral_classification; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.spectral_classification VALUES (1, 'O', 30000, NULL, 0.00003, 'BLUE', true, false);
INSERT INTO public.spectral_classification VALUES (2, 'B', 10000, 30000, 0.12000, 'BLUE WHITE', false, false);
INSERT INTO public.spectral_classification VALUES (3, 'A', 7500, 10000, 0.61000, 'WHITE', false, true);
INSERT INTO public.spectral_classification VALUES (4, 'F', 6000, 7500, 3.00000, 'YELLOWISH WHITE', false, false);
INSERT INTO public.spectral_classification VALUES (5, 'G', 5200, 6000, 7.60000, 'YELLOW', true, false);
INSERT INTO public.spectral_classification VALUES (6, 'K', 3700, 5200, 12.00000, 'LIGHT ORANGE', true, false);
INSERT INTO public.spectral_classification VALUES (7, 'M', 2400, 2400, 76.00000, 'ORANGISH RED', true, false);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.star VALUES (1, 1, 5, 'SUN', 8, 1.9, 'the star at the center of the Solar System.', true, true);
INSERT INTO public.star VALUES (2, 2, 2, 'Alpheratz', 0, 3.8, 'the brightest star in the constellation of Andromeda.', true, true);
INSERT INTO public.star VALUES (3, 2, 5, 'Mirach', 0, 2.4, 'prominent star in the northern constellation of Andromeda.', true, true);
INSERT INTO public.star VALUES (4, 2, 5, 'Snowball Nebula', 0, 1.9, 'planetary nebula located in the northern constellation Andromeda.', true, true);
INSERT INTO public.star VALUES (5, 1, 5, 'Delta Andromedae', 0, 1.3, 'triple star system in the northern constellation of Andromeda.', true, true);
INSERT INTO public.star VALUES (6, 1, 5, 'Mu Andromedae', 0, 2.0, 'the Bayer designation for a star in the northern constellation of Andromeda.', true, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 21, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: spectral_classification_spectral_classification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spectral_classification_spectral_classification_id_seq', 7, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: spectral_classification spectral_classification_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spectral_classification
    ADD CONSTRAINT spectral_classification_name_key UNIQUE (name);


--
-- Name: spectral_classification spectral_classification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spectral_classification
    ADD CONSTRAINT spectral_classification_pkey PRIMARY KEY (spectral_classification_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: star star_spectral_classification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_spectral_classification_id_fkey FOREIGN KEY (spectral_classification_id) REFERENCES public.spectral_classification(spectral_classification_id);


--
-- PostgreSQL database dump complete
--

