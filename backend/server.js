const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fitness"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error during query execution:', err);
        return res.status(500).send('Server error');
      }
  
      if (results.length > 0) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });

  app.post('/user-login', (req, res) => {
    const { username, password } = req.body;
  
    console.log('Received login request:', { username, password });
  
    // Query to find the member based on username
    const query = 'SELECT * FROM members WHERE memberName = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
  
      console.log('Query results:', results);
  
      if (results.length > 0) {
        const member = results[0];
        console.log('Member found:', member);
  
        // Convert contact to string for comparison
        const storedPassword = String(member.contact).trim();
        const enteredPassword = password.trim();
  
        console.log('Stored Password (contact):', storedPassword);
        console.log('Entered Password:', enteredPassword);
  
        if (storedPassword === enteredPassword) {  // Compare as strings
          console.log('Password match');
          res.json({ success: true, message: `Welcome ${member.memberName}` });
        } else {
          console.log('Password mismatch');
          res.json({ success: false, message: 'Invalid credentials' });
        }
      } else {
        console.log('No member found');
        res.json({ success: false, message: 'Invalid credentials' });
      }
    });
  });
  
  
  
  
  
    // to delete a member
 

app.delete('/members/:email', (req, res) => {
  const { email } = req.params;
  const DELETE_PLAN_QUERY = `DELETE FROM members WHERE email=?`;
  db.query(DELETE_PLAN_QUERY, [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'member not found' });
    } else {
      res.status(204).end();
    }
  });
});


// to view member details
  app.get('/members', (req, res) => {
    const sql = "SELECT * FROM members";
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching members:', err);
        return res.status(500).json({ error: 'Error fetching members' });
      }
      return res.status(200).json(results);
    });
  });

  app.post('/members', (req, res) => {
    const { memberName, contact, email, age, gender, plan, joiningDate, trainer } = req.body;
  
    console.log('Received data:', req.body);
  
    const sql = 'INSERT INTO members (memberName, contact, email, age, gender, plan, joiningDate, trainer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [memberName, contact, email, age, gender, plan, joiningDate, trainer], (err, result) => {
      if (err) {
        console.error('Error adding member:', err);
        return res.status(500).json({ error: 'Error adding member' });
      }
      res.status(201).json({ success: true, message: 'Member added successfully' });
    });
  });
  //to update members
  app.put('/members/:email', (req, res) => {
    const email = req.params.email;
    const { memberName, contact, age, gender, plan, joiningDate, trainer } = req.body;
    
    // Ensure all fields are provided
    if (!memberName || !contact || !age || !gender || !plan || !joiningDate || !trainer) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    const sql = `
      UPDATE members 
      SET memberName = ?, contact = ?, age = ?, gender = ?, plan = ?, joiningDate = ?, trainer = ?
      WHERE email = ?
    `;
  
    db.query(sql, [memberName, contact, age, gender, plan, joiningDate, trainer, email], (err, result) => {
      if (err) {
        console.error('Error updating member:', err);
        return res.status(500).json({ error: 'Error updating member' });
      }
      
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      res.json({ email, memberName, contact, age, gender, plan, joiningDate, trainer });
    });
  });
  




  // Assuming you have already set up your database connection (db)

  app.get('/api/members', (req, res) => {
    const query = 'SELECT memberName FROM members';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ error: 'Error fetching members' });
      } else {
        res.json(results);
      }
    });
  });
  

  // Create a new plan
app.post('/plans', (req, res) => {
  const { planName, amount, duration } = req.body;
  const INSERT_PLAN_QUERY = `INSERT INTO plans (planName, amount, duration) VALUES (?, ?, ?)`;
  db.query(INSERT_PLAN_QUERY, [planName, amount, duration], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, planName, amount, duration });
    }
  });
});

// Get all plans
app.get('/plans', (req, res) => {
  const SELECT_PLANS_QUERY = `SELECT * FROM plans`;
  db.query(SELECT_PLANS_QUERY, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Change Password Route
app.post('/changePassword', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const email = 'admin@svecw.edu.in';

  const sqlGetUser = 'SELECT password FROM login WHERE email = ?';
  db.query(sqlGetUser, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Error fetching user' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    if (currentPassword !== user.password) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const sqlUpdatePassword = 'UPDATE login SET password = ? WHERE email = ?';
    db.query(sqlUpdatePassword, [newPassword, email], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ error: 'Error updating password' });
      }
      res.status(200).json({ success: true, message: 'Password changed successfully' });
    });
  });
});





// Delete a plan
app.delete('/plans/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_PLAN_QUERY = `DELETE FROM plans WHERE id=?`;
  db.query(DELETE_PLAN_QUERY, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Plan not found' });
    } else {
      res.status(204).end();
    }
  });
});



app.get('/api/attendance', (req, res) => {
  const { employee, month } = req.query;
  const query = `
    SELECT date, 
           MAX(CASE WHEN type = 'Time In' AND HOUR(time) < 12 THEN time END) AS timeInMorning,
           MAX(CASE WHEN type = 'Time Out' AND HOUR(time) < 12 THEN time END) AS timeOutMorning,
           MAX(CASE WHEN type = 'Time In' AND HOUR(time) >= 12 THEN time END) AS timeInAfternoon,
           MAX(CASE WHEN type = 'Time Out' AND HOUR(time) >= 12 THEN time END) AS timeOutAfternoon,
           'View/Edit' AS action
    FROM time_logs 
    WHERE employee = ? 
      AND MONTH(date) = ? 
    GROUP BY date
  `;
  db.query(query, [employee, month], (err, results) => {
    if (err) {
      console.error('Error fetching attendance logs:', err);
      res.status(500).json({ error: 'Error fetching attendance logs' });
      return;
    }

    const updatedResults = results.map(log => {
      const timeInMorning = log.timeInMorning ? new Date(`1970-01-01T${log.timeInMorning}Z`) : null;
      const timeOutMorning = log.timeOutMorning ? new Date(`1970-01-01T${log.timeOutMorning}Z`) : null;
      const timeInAfternoon = log.timeInAfternoon ? new Date(`1970-01-01T${log.timeInAfternoon}Z`) : null;
      const timeOutAfternoon = log.timeOutAfternoon ? new Date(`1970-01-01T${log.timeOutAfternoon}Z`) : null;

      let totalHours = 0;

      if (timeInMorning && timeOutMorning) {
        totalHours += (timeOutMorning - timeInMorning) / (1000 * 60 * 60);
      }

      if (timeInAfternoon && timeOutAfternoon) {
        totalHours += (timeOutAfternoon - timeInAfternoon) / (1000 * 60 * 60);
      }

      // Format the date to be more readable
      const formattedDate = new Date(log.date).toISOString().split('T')[0];

      return {
        ...log,
        date: formattedDate,
        totalHours: totalHours.toFixed(2)
      };
    });

    console.log('Fetched logs:', updatedResults);
    res.json(updatedResults);
  });
});

app.post('/api/timeclock', (req, res) => {
  const { employee, date, time, type } = req.body;
  console.log('Received request body:', req.body);

  // Check if all required fields are provided
  if (!employee || !date || !time || !type) {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate 'type' field
  if (type !== 'Time In' && type !== 'Time Out') {
    console.error('Invalid type field');
    return res.status(400).json({ error: 'Invalid type field' });
  }
  
  // Assuming 'db' is your database connection instance
  const query = 'INSERT INTO time_logs (employee, date, time, type) VALUES (?, ?, ?, ?)';
  db.query(query, [employee, date, time, type], (err, result) => {
    if (err) {
      console.error('Error adding time log:', err);
      return res.status(500).json({ error: 'Error adding time log' });
    }
    console.log('Time log added to database:', result);
    res.json({ id: result.insertId, employee, date, time, type });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.get('/trainers', (req, res) => {
  const sql = 'SELECT id, first_name, email, contact_no, age, experience FROM trainers';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching trainers:', err);
      return res.status(500).json({ error: 'Error fetching trainers' });
    }
    res.json(result);
  });
});



app.delete('/trainers/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM trainers WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting trainer:', err);
      return res.status(500).json({ error: 'Error deleting trainer' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  });
});

app.put('/trainers/:id', (req, res) => {
  const id = req.params.id;
  const { first_name, email, contact_no, age, experience } = req.body;
  const sql = `
    UPDATE trainers 
    SET first_name = ?, email = ?, contact_no = ?, age = ?, experience = ? 
    WHERE id = ?
  `;
  db.query(sql, [first_name, email, contact_no, age, experience, id], (err, result) => {
    if (err) {
      console.error('Error updating trainer:', err);
      return res.status(500).json({ error: 'Error updating trainer' });
    }
    res.json({ id, first_name, email, contact_no, age, experience });
  });
});

// Create a new trainer
app.post('/register', (req, res) => {
  const { firstName, email, contactNo, address, age, experience } = req.body;

  const sql = 'INSERT INTO trainers (first_name, email, contact_no, address, age, experience) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, email, contactNo, address, age, experience], (err, result) => {
    if (err) {
      console.error('Error registering trainer:', err);
      return res.status(500).json({ message: 'Error registering trainer' });
    } else {
      console.log('Trainer registered successfully!');
      return res.status(201).json({ message: `Trainer ${firstName} registered successfully!` });
    }
  });
});



// Route to get feedback
app.get('/feedback', (req, res) => {
  db.query('SELECT memberName, feed FROM feedback', (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err.message);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.get('/user/:memberName', (req, res) => {
  const memberName = req.params.memberName;
  console.log('Fetching details for member:', memberName); // Log memberName

  db.query('SELECT * FROM members WHERE memberName = ?', [memberName], (err, results) => {
    if (err) {
      console.error('Error fetching member details:', err);
      res.status(500).send('Internal Server Error');
    } else if (results.length > 0) {
      console.log('Member details found:', results[0]); // Log member details
      res.json(results[0]); // Send the first result if found
    } else {
      console.log('No member found with name:', memberName); // Log if no member found
      res.status(404).send('Member not found');
    }
  });
});


app.listen(8081, () => {
    console.log("Listening...");
});