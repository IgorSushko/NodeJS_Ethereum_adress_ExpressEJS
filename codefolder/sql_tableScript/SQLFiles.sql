USE testmysql;
CREATE TABLE tblLuhnResult (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cardnumber BIGINT NOT NULL,
    result TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT
)
