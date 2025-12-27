import mongoose from 'mongoose';
import Assignment from '../models/assignmentModel.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleAssignments = [
  {
    title: "Basic SELECT Query",
    description: "Learn to retrieve data from a single table",
    difficulty: "Easy",
    question: "Write a SQL query to select all employees from the employees table.",
    requirements: [
      "Use SELECT statement",
      "Include all columns",
      "Return all rows"
    ],
    hints: [
      "Use SELECT * to get all columns",
      "FROM clause specifies the table name"
    ],
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "DECIMAL" },
          { columnName: "hire_date", dataType: "DATE" }
        ],
        rows: [
          { id: 1, name: 'Alice Johnson', department: 'HR', salary: 45000, hire_date: '2023-01-15' },
          { id: 2, name: 'Bob Smith', department: 'Engineering', salary: 60000, hire_date: '2022-03-20' },
          { id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 75000, hire_date: '2021-07-10' },
          { id: 4, name: 'Diana Prince', department: 'Sales', salary: 48000, hire_date: '2023-05-12' },
          { id: 5, name: 'Eve Wilson', department: 'Sales', salary: 55000, hire_date: '2022-11-08' }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: "All employee records"
    },
    isActive: true
  },
  {
    title: "WHERE Clause Filtering",
    description: "Filter data using WHERE conditions",
    difficulty: "Easy",
    question: "Find all employees in the 'Engineering' department with salary greater than 50000.",
    requirements: [
      "Use WHERE clause",
      "Filter by department",
      "Filter by salary"
    ],
    hints: [
      "Use AND to combine conditions",
      "String values need quotes"
    ],
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "DECIMAL" },
          { columnName: "hire_date", dataType: "DATE" }
        ],
        rows: [
          { id: 1, name: 'Alice Johnson', department: 'HR', salary: 45000, hire_date: '2023-01-15' },
          { id: 2, name: 'Bob Smith', department: 'Engineering', salary: 60000, hire_date: '2022-03-20' },
          { id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 75000, hire_date: '2021-07-10' },
          { id: 4, name: 'Diana Prince', department: 'Sales', salary: 48000, hire_date: '2023-05-12' },
          { id: 5, name: 'Eve Wilson', department: 'Sales', salary: 55000, hire_date: '2022-11-08' },
          { id: 6, name: 'Frank Miller', department: 'Engineering', salary: 85000, hire_date: '2020-09-15' }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: "Engineering employees with salary > 50000"
    },
    isActive: true
  },
  {
    title: "JOIN Operations",
    description: "Combine data from multiple tables",
    difficulty: "Medium",
    question: "Get employee names along with their project names using INNER JOIN.",
    requirements: [
      "Use INNER JOIN",
      "Join employees and projects tables",
      "Select specific columns"
    ],
    hints: [
      "JOIN ON condition matches related columns",
      "Use table aliases for clarity"
    ],
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "VARCHAR" },
          { columnName: "project_id", dataType: "INTEGER" }
        ],
        rows: [
          { id: 1, name: 'Alice Johnson', project_id: 101 },
          { id: 2, name: 'Bob Smith', project_id: 102 },
          { id: 3, name: 'Charlie Brown', project_id: 101 },
          { id: 4, name: 'Diana Prince', project_id: 103 }
        ]
      },
      {
        tableName: "projects",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "project_name", dataType: "VARCHAR" },
          { columnName: "budget", dataType: "DECIMAL" }
        ],
        rows: [
          { id: 101, project_name: 'Website Redesign', budget: 50000 },
          { id: 102, project_name: 'Mobile App', budget: 75000 },
          { id: 103, project_name: 'Data Analytics', budget: 60000 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: "Employee names with project names"
    },
    isActive: true
  },
  {
    title: "Aggregate Functions",
    description: "Use COUNT, SUM, AVG functions with GROUP BY",
    difficulty: "Medium",
    question: "Calculate the average salary for each department and count the number of employees.",
    requirements: [
      "Use GROUP BY clause",
      "Use AVG() function",
      "Use COUNT() function"
    ],
    hints: [
      "GROUP BY groups rows with same values",
      "Aggregate functions work on grouped data"
    ],
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "DECIMAL" }
        ],
        rows: [
          { id: 1, name: 'Alice Johnson', department: 'HR', salary: 45000 },
          { id: 2, name: 'Bob Smith', department: 'Engineering', salary: 60000 },
          { id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 75000 },
          { id: 4, name: 'Diana Prince', department: 'Sales', salary: 48000 },
          { id: 5, name: 'Eve Wilson', department: 'Sales', salary: 55000 },
          { id: 6, name: 'Frank Miller', department: 'Engineering', salary: 85000 },
          { id: 7, name: 'Grace Lee', department: 'HR', salary: 50000 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: "Department statistics"
    },
    isActive: true
  }
];

async function seedAssignments() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');

    // Insert sample assignments
    const result = await Assignment.insertMany(sampleAssignments);
    console.log(`Inserted ${result.length} assignments`);

    console.log('Sample assignments created successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding assignments:', error);
    process.exit(1);
  }
}

seedAssignments();