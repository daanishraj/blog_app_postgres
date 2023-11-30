CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
insert into blogs (author,url, title, likes) values ('Paramhansa Yogananda', 'https://www.yogananda.org','Divine Romance', 108);
insert into blogs (author, url, title) values('Sri Yukteswar', 'https://www.youthofgoldenage.de', 'Holy Science');
select * from blogs;

