alter table properties rename column weight to atomic_mass;
alter table properties rename column melting_point to melting_point_celsius;
alter table properties rename column boiling_point to boiling_point_celsius;
alter table properties alter column melting_point_celsius set not null;
alter table properties alter column boiling_point_celsius set not null;

alter table elements add constraint elements_symbol_unique unique(symbol);
alter table elements add constraint elements_name_unique unique(name);
alter table elements alter column symbol set not null;
alter table elements alter column name set not null;

alter table properties add foreign key(atomic_number) references elements(atomic_number);

create table types(type_id serial primary key, type varchar(30) not null);
insert into types(type) select distinct(type) from properties;

alter table properties add column type_id int references types(type_id);
alter table properties alter column atomic_mass type real using atomic_mass::real;

update elements set symbol=initcap(symbol);
insert into elements(atomic_number,symbol,name) values (9, 'F', 'Fluorine');
insert into elements(atomic_number,symbol,name) values (10, 'Ne', 'Neon');
insert into properties (atomic_number,type,atomic_mass,melting_point_celsius,boiling_point_celsius) values (9,'nonmetal',18.998,-220,-188.1);
insert into properties (atomic_number,type,atomic_mass,melting_point_celsius,boiling_point_celsius) values (10,'nonmetal',20.18,-248.6,-246.1);

update properties set type_id=types.type_id from types where properties.type=types.type;
alter table properties alter column type_id set not null;
alter table properties drop column type;

delete from properties where atomic_number=1000;
delete from elements where atomic_number=1000;
