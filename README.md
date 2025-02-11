# Microservice Deployment

This repository contains the necessary code and instructions to deploy a microservice-based student information system using two Virtual Machines (VMs):
- **VM1**: MySQL Database Server 
- **VM2**: Student Microservice

## 1. VM1: MySQL Database Setup

### Installation of MySQL Server
```sh
sudo apt update
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Creating Database & Tables
```sql
CREATE DATABASE College;
USE College;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO students (name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO students (name, email) VALUES ('Bob', 'bob@example.com');

CREATE USER 'microservice'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON College.* TO 'microservice'@'%';
FLUSH PRIVILEGES;
```

### Allow Remote Connections
```sh
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```
Change:
```
bind-address = 127.0.0.1
```
To:
```
bind-address = 0.0.0.0
```
Restart MySQL:
```sh
sudo systemctl restart mysql
```

## 2. VM2: Student Microservice Deployment

### Install Docker & Node.js
```sh
sudo apt update
sudo apt install -y docker.io nodejs npm
```

## 4. Deployment Instructions
1. Set up VM1 and install MySQL.
2. Run the provided SQL commands to create the database and tables.
3. Configure MySQL for remote access.
4. Set up VM2 and install Docker & Node.js.
5. Clone this repository on VM2:
   ```sh
   git clone https://github.com/sanikanarmitwar/student-service.git
   cd student-service
   ```
6. Build and run the microservice using Docker:
   ```sh
   docker build -t student-service .
   docker run -d -p 3000:3000 student-service
   ```
7. Access the microservice:
   ```sh
   curl http://<your_ip>:3000/students
   ```


