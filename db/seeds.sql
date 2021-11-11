INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 75000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 150000, 3),
       ('Accountant', 95000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Smith', 1, ),
       ('Sarah', 'Anderson', 2, 1),
       ('Tom', 'Lewis', 3, ),
       ('Steve', 'Miller', 4, 3),
       ('Chris', 'Zo', 5, ),
       ('Zayn', 'Zucker', 6, 5);