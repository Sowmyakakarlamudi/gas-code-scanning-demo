const express = require('express');
const { exec } = require('child_process');

const app = express();

// VULNERABLE: user-controlled input passed to shell (CodeQL should flag: js/command-line-injection)
app.get('/run', (req, res) => {
  const cmd = req.query.cmd || "echo hello";
  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).send(String(err));
    res.send(stdout || stderr);
  });
});

app.listen(3000, () => console.log('Listening on 3000'));
