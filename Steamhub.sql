DROP TABLE uitnodiging;
DROP table speelmoment;
CREATE TABLE speelmoment (
	id	serial NOT NULL,
	creator varchar(32) NOT NULL,
	creator_name varchar(100) NOT NULL,
	private bool NOT NULL,
	datum date NOT NULL,
	starttijd time NOT NULL,
	eindtijd time NOT NULL,

	game_name varchar(100) not null,
	game_id		int4 not null,
	primary key (id)
);

CREATE TABLE uitnodiging (
	id serial not null,
	speelmoment int4 not null,
	answered bool not null Default false,
	accepted bool not null Default false,
	player varchar(32) not null,
	player_name varchar(100) not null,

	primary key (id)
);


alter table uitnodiging
	ADD CONSTRAINT FKuitnodigingSpeelmoment FOREIGN KEY (speelmoment) REFERENCES speelmoment (id);
	

