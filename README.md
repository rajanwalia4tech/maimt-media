# MAIMTMEDIA Project

## Installations

```
npm install express ejs sequelize mysql2
```

## Database Setup

```
mysql -u root
```

``` 
create database maimtmediadb;

create user maimtmediauser identified with mysql_native_password by 'Password123#@!';

grant all privileges on maimtmediadb.*  to maimtmediauser;

flush privileges;
```
