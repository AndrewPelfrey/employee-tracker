import client from './connection.js';

export function viewDepartments() {
    return client.query('SELECT * FROM department;');
};

export function viewRoles() {
    return client.query('SELECT * FROM role;');
};

export function viewEmployees() {
    return client.query('SELECT * FROM employee;');
};

export function addDepartment(departmentName) {
    return client.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *;',
        [departmentName]
    );
};

export function addRole (roleTitle, salary, departmentId) {
    return client.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;',
        [roleTitle, salary, departmentId]
    );
};

export function addEmployee(firstName, lastName, roleId, managerId) {
    return client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;',
        [firstName, lastName, roleId, managerId]
    );
};

export function updateEmployeeRole(employeeId, newRoleId) {
    return client.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;',
        [newRoleId, employeeId]
    );
};
