INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 75000, 1),
       ('Lead Engineer', 120000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();