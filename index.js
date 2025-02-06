import inquirer from 'inquirer';
import client from './db/connection.js';

import { type } from 'os';

import {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} from './db/queries.js';

const initialOptions = async () => {
  const answer = await inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role',
          ],
      },
  ]);

  switch (answer.action) {
      case 'View all departments':
          viewDepartments().then((result) => {
              console.table(result.rows);
              initialOptions();
          });
          break;
      case 'View all roles':
          viewRoles().then((result) => {
              console.table(result.rows);
              initialOptions();
          });
          break;
      case 'View all employees':
          viewEmployees().then((result) => {
              console.table(result.rows);
              initialOptions();
          });
          break;
      case 'Add a department':
          addDepartmentPrompt();
          break;
      case 'Add a role':
          addRolePrompt();
          break;
      case 'Add an employee':
          addEmployeePrompt();
          break;
      case 'Update an employee role':
          updateEmployeeRolePrompt();
          break;
      default:
          console.log('invalid role');
  }
};


const addDepartmentPrompt = () => {
inquirer
  .prompt([
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department',
    },
  ])
  .then((answer) =>{
    addDepartment(answer.departmentName).then((result) => {
        console.log(`Added department: ${result.rows[0].name}`);
        initialOptions();
    });
  });
};
const addRolePrompt = () => {
inquirer
  .prompt([
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the new role',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary of the new role',
    },
    {
        type: 'list',
        name: 'department',
        message: 'Select the department for the role:',
        choices: ['Sales', 'Engineering','Human Resources', 'Marketing'],
    },
  ])
  .then((answer) => {
    viewDepartments().then((departments) => {
      const department = departments.rows.find(
        (dept) => dept.name === answer.department
      );

      if (department) {
        addRole(answer.roleTitle, answer.roleSalary, department.id).then(
          (result) => {
            console.log(`Added role: ${result.rows[0].title}`);
            initialOptions();
          }
        );
      } else {
        console.log('Department not found.');
        initialOptions();
      }
    });
  });
};
const addEmployeePrompt = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Employees first name:',
      }, 
      {
        type: 'input',
        name: 'last_name',
        message: 'Employees last name:',
      },
      // {
      //   type: 'input',
      //   name: 'salary',
      //   message: 'Employees salary:',
      // },
      {
        type: 'list',
        name: 'role',
        message: 'Select the role for the employee:',
        choices: ['Sales Manager', 'Software Engineer', 'HR Manager', 'Marketing Specialist'],
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter manager id (leave blank if none):',
        default: null,
      },
    ])
    .then((answer) => {
      viewRoles().then((result) => {
        const role = result.rows.find((role) => role.title === answer.role);
  
        addEmployeeToDb(answer.first_name, answer.last_name, role.id, answer.manager_id)
          .then(() => {
            console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
            initialOptions();
          });
      });
    });
};
const addEmployeeToDb = async (firstName, lastName, roleId, managerId) => {
  try {
    const result = await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, roleId, managerId]  
    );
    
  } catch (err) {
    console.error('Error adding employee:', err);
  }
};
const updateEmployeeRolePrompt = () => {
    viewEmployees().then((result) => {
        inquirer
          .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update?',
                choices: result.rows.map((employee) => `${employee.first_name} ${employee.last_name}`), 
            },
          ])
          .then((answer) => {
            const employee = result.rows.find(
                (emp) => `${emp.first_name} ${emp.last_name}` === answer.employee
            );

            viewRoles().then((roles) => {
                inquirer
                  .prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select the new role for the employee:',
                        choices: roles.rows.map((role) => role.title),
                    },
                  ])
                  .then((answerRole) => {
                    const newRole = roles.rows.find(
                        (role) => role.title === answerRole.role
                    );
                    updateEmployeeRole(employee.id, newRole.id).then((result) => {
                        console.log(`Updated ${employee.first_name} ${employee.last_name}'s role`);
                        initialOptions();
                    });
                  });
            });
          });
    });
};

const updateRole = (employeeId, newRoleId) => {
    return db.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;',
        [newRoleId, employeeId]
    );
};

initialOptions();