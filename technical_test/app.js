const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

function CommonPrefix(strs) {
  let maxLenght = 200;
  let commonPrefix = '';
  let processArray = [];
  // find max lenght & convert string to array of char
  for (let str of strs) {
    let strArray = Array.from(str);
    console.log(strArray);
    if(maxLenght > strArray.length) {
      maxLenght = strArray.length;
    }
    processArray.push(strArray);
  }
  // compare string
  for (let i = 0; i < maxLenght; i++) {
    let testChar = '';
    let found = 0;
    for (let j = 0; j < processArray.length; j++) {
       if (j === 0) {
        testChar = processArray[j][i];
       }

       if (testChar === processArray[j][i]) {
        found++;
       }
    }

    if (found == processArray.length) {
      commonPrefix = commonPrefix + testChar;
    }
    else {
      break;
    }
  }
  
  return (commonPrefix != '') ? 'Output: "' + commonPrefix +'"' : 'Output: ""<br>Explanation: There is no common prefix among the input strings.'; 
} 

app.get("/", (req, res) => {
  // let strs = ["flower", "flow", "flight"];
  let strs = ["dog", "racecar", "car"];
  let output = CommonPrefix(strs);
  res.send(output);
});

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});