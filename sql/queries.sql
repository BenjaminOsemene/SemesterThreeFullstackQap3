CREATE TABLE IF NOT EXISTS public.basketball_players
(
    id integer NOT NULL DEFAULT nextval('basketball_players_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    team character varying(50) COLLATE pg_catalog."default",
    "position" character varying(20) COLLATE pg_catalog."default",
    "height(cm)" integer,
    age integer,
    jersey_number integer,
    CONSTRAINT basketball_players_pkey PRIMARY KEY (id)
)


INSERT INTO public.basketball_players
(first_name, last_name, team, "position", "height(cm)", age, jersey_number)
VALUES
('LeBron', 'James', 'Los Angeles Lakers', 'Small Forward', 206, 38, 23),
('Stephen', 'Curry', 'Golden State Warriors', 'Point Guard', 188, 35, 30),
('Giannis', 'Antetokounmpo', 'Milwaukee Bucks', 'Power Forward', 211, 28, 34),
('Kevin', 'Durant', 'Phoenix Suns', 'Small Forward', 208, 34, 35),
('Nikola', 'Jokic', 'Denver Nuggets', 'Center', 213, 28, 15);


SELECT * FROM public.basketball_players;

SELECT first_name, last_name, team, "position"
FROM public.basketball_players;

SELECT first_name, last_name, jersey_number
FROM public.basketball_players
WHERE team = 'Los Angeles Lakers';

SELECT first_name, last_name, "height(cm)"
FROM public.basketball_players
WHERE "height(cm)" > 200;

SELECT first_name, last_name, age
FROM public.basketball_players
WHERE "position" = 'Point Guard'
ORDER BY age DESC;

SELECT first_name, last_name, jersey_number
FROM public.basketball_players
WHERE jersey_number BETWEEN 20 AND 30;

SELECT first_name, last_name
FROM public.basketball_players
WHERE first_name LIKE 'L%';


UPDATE public.basketball_players
SET team = 'Toronto Raptors'
WHERE last_name = 'Durant' AND first_name = 'Kevin'
RETURNING *;

UPDATE public.basketball_players
SET team = 'Miami Heat', jersey_number = 6
WHERE first_name = 'LeBron' AND last_name = 'James'
RETURNING *;

UPDATE public.basketball_players
SET age = age + 1
RETURNING *;

UPDATE public.basketball_players
SET "position" = 
    CASE 
        WHEN "height(cm)" > 210 THEN 'Center'
        WHEN "height(cm)" > 200 THEN 'Forward'
        ELSE 'Guard'
    END
RETURNING *;

UPDATE public.basketball_players
SET team = UPPER(team)
RETURNING *;


DELETE FROM public.basketball_players
WHERE age > 20
RETURNING *
LIMIT 1;

DELETE FROM public.basketball_players
WHERE age > 35 OR "height(cm)" < 200
RETURNING first_name, last_name, age, "height(cm)";

DELETE FROM public.basketball_players
WHERE jersey_number BETWEEN 6 AND 30
RETURNING first_name, last_name, jersey_number;
