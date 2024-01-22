--psql --username=freecodecamp --dbname=postgres
--psql --username=freecodecamp -U postgres < universe.sql
--pg_dump -cC --inserts -U freecodecamp universe > universe.sql

-- STRUCTURE

CREATE DATABASE universe;

\c universe;

CREATE TABLE galaxy(
    galaxy_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    stars INT NOT NULL,
    planets INT NOT NULL,
    size_in_kpc NUMERIC(5,1),
    description TEXT,
    has_elliptical_shape BOOLEAN, 
    has_spiral_shape BOOLEAN
);

CREATE TABLE SPECTRAL_CLASSIFICATION(
    spectral_classification_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    lower_temperature_in_k INT NOT NULL,
    higher_temperature_in_k INT,
    fraction_main_sequence_stars_in_perc NUMERIC(10,5),
    description TEXT,
    weak BOOLEAN, 
    strong BOOLEAN

);

CREATE TABLE star(
    star_id SERIAL PRIMARY KEY,
    galaxy_id INT NOT NULL REFERENCES galaxy(galaxy_id),
    spectral_classification_id INT NOT NULL REFERENCES spectral_classification(spectral_classification_id),
    name VARCHAR(30) NOT NULL UNIQUE,
    planets INT NOT NULL,
    mass_in_kg NUMERIC(5,1),
    description TEXT,
    rotates_counterclockwise BOOLEAN, 
    is_early_type BOOLEAN
);

CREATE TABLE planet(
    planet_id SERIAL PRIMARY KEY,
    star_id INT NOT NULL REFERENCES star(star_id),
    name VARCHAR(30) NOT NULL UNIQUE,
    moons INT NOT NULL,
    mass_in_kg NUMERIC(5,1),
    description TEXT,
    has_life BOOLEAN,
    is_ocean_planet BOOLEAN
);

CREATE TABLE moon(
    moon_id SERIAL PRIMARY KEY,
    planet_id INT NOT NULL REFERENCES planet(planet_id),
    name VARCHAR(30) NOT NULL UNIQUE,
    moons INT NOT NULL,
    mass_in_kg NUMERIC(5,1),
    description TEXT,
    has_life BOOLEAN,
    is_galilean BOOLEAN
);

-- DATASET --
INSERT INTO galaxy(
    name,
    stars,
    planets,
    size_in_kpc,
    description,
    has_elliptical_shape, 
    has_spiral_shape
) VALUES 
('Milky Way', 100, 800, 26.8, 'the galaxy that includes the Solar System', FALSE, TRUE),
('Andromeda Galaxy', 1000, 0, 765, 'Andromeda is the closest big galaxy to the Milky Way and is expected to collide with the Milky Way around 4.5 billion years from now', FALSE, TRUE),
('Backward Galaxy', 100, 0, 26.8, 'It appears to rotate backwards, as the tips of the spiral arms point in the direction of rotation.', FALSE, TRUE),
('Cigar Galaxy', 100, 0, 26.8, 'Appears similar in shape to a cigar.', TRUE, FALSE),
('Needle Galaxy', 100, 0, 26.8, 'Named due to its slender appearance.', TRUE, FALSE),
('Sculptor Galaxy', 100, 0, 26.8, '	Named after its location in the Sculptor Constellation. Also called the Silver Dollar or Silver Coin Galaxy, because of its light and circular appearance.', FALSE, TRUE);

INSERT INTO SPECTRAL_CLASSIFICATION(
    name,
    lower_temperature_in_k,
    higher_temperature_in_k,
    fraction_main_sequence_stars_in_perc,
    description,
    weak, 
    strong

) VALUES 
('O', 30000, NULL, 0.00003, 'BLUE', TRUE, FALSE),
('B', 10000, 30000, 0.12, 'BLUE WHITE', FALSE, FALSE),
('A', 7500, 10000, 0.61, 'WHITE', FALSE, TRUE),
('F', 6000, 7500, 3, 'YELLOWISH WHITE', FALSE, FALSE),
('G', 5200, 6000, 7.6, 'YELLOW', TRUE, FALSE),
('K', 3700, 5200, 12, 'LIGHT ORANGE', TRUE, FALSE),
('M', 2400, 2400, 76, 'ORANGISH RED', TRUE, FALSE);

INSERT INTO star(
    galaxy_id,
    spectral_classification_id,
    name,
    planets,
    mass_in_kg,
    description,
    rotates_counterclockwise, 
    is_early_type
) VALUES
(1, 5, 'SUN', 8, 1.9, 'the star at the center of the Solar System.', TRUE, TRUE),
(2, 2, 'Alpheratz', 0, 3.8, 'the brightest star in the constellation of Andromeda.', TRUE, TRUE),
(2, 5, 'Mirach', 0, 2.4, 'prominent star in the northern constellation of Andromeda.', TRUE, TRUE),
(2, 5, 'Snowball Nebula', 0, 1.9, 'planetary nebula located in the northern constellation Andromeda.', TRUE, TRUE),
(1, 5, 'Delta Andromedae', 0, 1.3, 'triple star system in the northern constellation of Andromeda.', TRUE, TRUE),
(1, 5, 'Mu Andromedae', 0, 2, 'the Bayer designation for a star in the northern constellation of Andromeda.', TRUE, TRUE);

INSERT INTO planet(
    star_id,
    name,
    moons,
    mass_in_kg,
    description,
    has_life,
    is_ocean_planet
) VALUES
(1, 'Mercury', 0, 3.3, 'the first planet from the Sun and the smallest in the Solar System.', FALSE, FALSE),
(1, 'Venus', 0, 4.8, 'the second planet from the Sun. It has the densest atmosphere of all rocky bodies in the Solar System.', FALSE, FALSE),
(1, 'Earth', 1, 5.9, 'the third planet from the Sun and the only astronomical object known to harbor life.', TRUE, TRUE),
(1, 'Mars', 0, 3.3, 'the fourth planet from the Sun. The surface of Mars is orange-red because it is covered in iron(III) oxide dust.', FALSE, FALSE),
(1, 'Jupiter', 0, 1.9, 'the fifth planet from the Sun and the largest in the Solar System.', FALSE, FALSE),
(1, 'Saturn', 0, 5.6, 'the sixth planet from the Sun and the second-largest in the Solar System.', FALSE, FALSE),
(1, 'Uranus', 0, 8.6, 'the seventh planet from the Sun.', FALSE, FALSE),
(1, 'Neptune', 0, 1, 'the eighth and farthest planet from the Sun.', FALSE, FALSE),
(1, 'Ceres', 0, 0, 'dwarf planet in the middle main asteroid belt between the orbits of Mars and Jupiter.', FALSE, FALSE),
(1, 'Orcus', 0, 0, 'large trans-Neptunian object with a large moon, Vanth', FALSE, FALSE),
(1, 'Pluto', 0, 0, 'dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.', FALSE, FALSE),
(1, 'Haumea', 0, 0, 'dwarf planet located beyond Neptunes orbit.', FALSE, FALSE);

INSERT INTO moon(
    planet_id,
    name,
    moons,
    mass_in_kg,
    description,
    has_life,
    is_galilean
)
VALUES
(3, 'Moon', 0, 7.3, 'always presents the same side to Earth, because gravitational pull has locked its rotation to the planet.', FALSE, FALSE),
(4, 'Phobos', 0, 1, 'the innermost and larger of the two natural satellites of Mars.', FALSE, FALSE),
(4, 'Delmos', 0, 1.4, 'he smaller and outermost of the two natural satellites of Mars.', FALSE, FALSE),
(5, 'Metis ', 0, 0, 'the innermost known moon of Jupiter.', FALSE, FALSE),
(5, 'Adrastea', 0, 0, 'the second by distance, and the smallest of the four inner moons of Jupiter.', FALSE, FALSE),
(5, 'Amalthea', 0, 0, 'has the third closest orbit around Jupiter among known moons and was the fifth moon of Jupiter to be discovered.', FALSE, FALSE),
(5, 'Thebe', 0, 0, 'the fourth of Jupiters moons by distance from the planet.', FALSE, FALSE),
(5, 'Io', 0, 0, 'Galilean moon of Jupiter.', FALSE, FALSE),
(5, 'Europa', 0, 0, 'Galilean moon of Jupiter.', FALSE, FALSE),
(5, 'Ganymede', 0, 0, 'Galilean moon of Jupiter.', FALSE, FALSE),
(5, 'Callisto', 0, 0, 'Galilean moon of Jupiter.', FALSE, FALSE),
(5, 'Themisto', 0, 0, 'the innermost irregular moon and is not part of a known family.', FALSE, FALSE),
(5, 'Leda', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Ersa', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Himalia', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Pandia', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Lysithea', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Elara', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Dia', 0, 0, 'Himalia moon of Jupiter.', FALSE, FALSE),
(5, 'Carpo', 0, 0, 'small outer natural satellite of Jupiter.', FALSE, FALSE),
(5, 'Ananke', 0, 0, 'retrograde irregular satellites of Jupiter.', FALSE, FALSE);

