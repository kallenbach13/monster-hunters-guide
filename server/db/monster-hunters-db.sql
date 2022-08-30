CREATE TABLE "monsters" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "description" varchar,
  "type" varchar(100),
  "danger_level" integer,
  "powers" varchar,
  "weaknesses" varchar,
  "image_url_one" varchar(255),
  "image_url_two" varchar(255)
);