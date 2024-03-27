const { Client } = require('pg');
const xlsx = require('xlsx');

// Set up PostgreSQL connection configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
  database: 'your_database_name',
};

// Read the Excel file
const workbook = xlsx.readFile('path/to/your/excel_file.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Extract data from the Excel sheet
const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

// Connect to the PostgreSQL database
const client = new Client(dbConfig);
client.connect();

// Insert the data into the PostgreSQL table
(async () => {
  try {
    for (let i = 1; i < excelData.length; i++) {
      const [column1, column2, column3] = excelData[i]; // Modify as per your Excel structure

      const query =
        'INSERT INTO your_table_name (column1, column2, column3) VALUES ($1, $2, $3)';
      await client.query(query, [column1, column2, column3]);
    }
    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    client.end();
  }
})();
