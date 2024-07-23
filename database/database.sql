create table if not exists tb_genere(
    id BIGSERIAL PRIMARY KEY,
	name text,
	state boolean default true
);

create table if not exists tb_person (
    id BIGSERIAL PRIMARY KEY,
	name text,
	phone text [],
	birth_date date,
	genere_id Integer,
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true,
    FOREIGN KEY (genere_id) REFERENCES tb_genere(id)
);

create table if not exists tb_user(
    id BIGSERIAL PRIMARY KEY,
	username text,
	password text,
	person_id integer,
	rank numeric(10,5),
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true
);


create table if not exists tb_asignatura(
    id BIGSERIAL PRIMARY KEY,
	name text,
	dificultad text,
	rank numeric(10,5),
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true
);


create table if not exists tb_level(
    id BIGSERIAL PRIMARY KEY,
	name text,
	dificultad text,
	rank numeric(10,5),
	asignatura_id Integer,
	last_id Integer,
	max_number numeric(10,5) default 10,
	min_number numeric(10,5) default 7,
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true,
    FOREIGN KEY (asignatura_id) REFERENCES tb_asignatura(id)
);


create table if not exists tb_asignatura_user(
    id BIGSERIAL PRIMARY KEY,
	progress numeric(10,5),
	asignatura_id Integer,
	user_id Integer,
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true,
	complete boolean default false,
    FOREIGN KEY (asignatura_id) REFERENCES tb_asignatura(id),
    FOREIGN KEY (user_id) REFERENCES tb_user(id)
);


create table if not exists tb_level_assign(
    id BIGSERIAL PRIMARY KEY,
	progress numeric(10,5),
	asignatura_id Integer,
	user_id Integer,
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	state boolean default true,
	complete boolean default false,
	approved boolean default false,
	FOREIGN KEY (asignatura_id) REFERENCES tb_asignatura_user(id),
    FOREIGN KEY (user_id) REFERENCES tb_user(id)
);


alter table tb_person add column email text;



CREATE OR REPLACE FUNCTION insert_user(
    IN _username text,
    IN _password text,
    IN _name text,
    IN _phone text[],
    IN _email text,
    IN _birth_date date,
    IN _genere_id int default null
) RETURNS text
    LANGUAGE plpgsql
AS
$$
DECLARE 
    IdPerson int;
    issetUser int;
    mensaje text;
BEGIN
    SELECT id INTO IdPerson FROM tb_person tp WHERE tp.name = _name;
    SELECT id INTO issetUser FROM tb_user tu WHERE tu.username = _username;
    
    IF IdPerson IS NULL THEN
        INSERT INTO tb_person
            (name, phone, birth_date, genere_id, email)
        VALUES (_name, _phone, _birth_date, _genere_id, _email)
        RETURNING id INTO IdPerson;
    ELSE
        UPDATE tb_person
        SET name = _name, phone = _phone, birth_date = _birth_date, 
            genere_id = _genere_id, email = _email
        WHERE id = IdPerson;
    END IF;

    IF issetUser IS NOT NULL THEN
        mensaje := FORMAT('El usuario: %s ya existe', _username);
    ELSE
        INSERT INTO tb_user
            (username, password, person_id, rank)
        VALUES (_username, _password, IdPerson, 0);
        mensaje := FORMAT('El usuario: %s fue creado con éxito', _username);
    END IF;

    RETURN mensaje;
END;
$$;




SELECT * from insert_user('admin', 'admin123', 'Administrador', array['0963835535', '0943835535'], 'admin@admin.com', '2002-05-21');




