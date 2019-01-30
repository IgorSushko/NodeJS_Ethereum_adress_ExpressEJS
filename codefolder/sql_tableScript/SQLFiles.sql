USE testmysql;
CREATE TABLE tblLuhnResult1 (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
cardnumber BIGINT NOT NULL,
result TEXT NOT NULL,
timeStamp BIGINT,
comments TEXT
) 