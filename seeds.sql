INSERT INTO department (name)
SELECT 'Sales' WHERE NOT EXISTS (SELECT 1 FROM department WHERE name = 'Sales');
INSERT INTO department (name)
SELECT 'Engineering' WHERE NOT EXISTS (SELECT 1 FROM department WHERE name = 'Engineering');
INSERT INTO department (name)
SELECT 'Human Resources' WHERE NOT EXISTS (SELECT 1 FROM department WHERE name = 'Human Resources');
INSERT INTO department (name)
SELECT 'Marketing' WHERE NOT EXISTS (SELECT 1 FROM department WHERE name = 'Marketing');

INSERT INTO role (title, salary, department_id)
SELECT 'Sales Manager', 80000, 1 WHERE NOT EXISTS (SELECT 1 FROM role WHERE title = 'Sales Manager');
INSERT INTO role (title, salary, department_id)
SELECT 'Software Engineer', 90000, 2 WHERE NOT EXISTS (SELECT 1 FROM role WHERE title = 'Software Engineer');
INSERT INTO role (title, salary, department_id)
SELECT 'HR Manager', 75000, 3 WHERE NOT EXISTS (SELECT 1 FROM role WHERE title = 'HR Manager');
INSERT INTO role (title, salary, department_id)
SELECT 'Marketing Specialist', 65000, 4 WHERE NOT EXISTS (SELECT 1 FROM role WHERE title = 'Marketing Specialist');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
SELECT 'John', 'Smith', 1, NULL WHERE NOT EXISTS (SELECT 1 FROM employee WHERE first_name = 'John' AND last_name = 'Smith');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
SELECT 'Tim', 'Lima', 2, 1 WHERE NOT EXISTS (SELECT 1 FROM employee WHERE first_name = 'Tim' AND last_name = 'Lima');
INSERT INTO employee (first_name, last_name, role_id, manager_id)
SELECT 'Mark', 'Johnson', 3, NULL WHERE NOT EXISTS (SELECT 1 FROM employee WHERE first_name = 'Mark' AND last_name = 'Johnson');
INSERT INTO employee (first_name, last_name, role_id, manager_id)
SELECT 'Emily', 'Harbert', 4, NULL WHERE NOT EXISTS (SELECT 1 FROM employee WHERE first_name = 'Emily' AND last_name = 'Harbert');
