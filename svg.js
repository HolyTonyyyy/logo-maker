const fs = require('fs');
const inquirer = require('inquirer');

// Prompt user for logo details
inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Please Eneter 3 Letters:',
    },
    {
      type: 'list',
      name: 'color',
      message: 'Select a color:',
      choices: ['red', 'green', 'blue'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'square', 'triangle'],
    },
  ])
  .then((answers) => {
    // Generate SVG code
    const svg = new SVGBuilder();
    if (answers.shape === 'circle') {
      svg.circle(100, 100, 50, {
        fill: answers.color,
      });
    } else if (answers.shape === 'square') {
      svg.rect(50, 50, 100, 100, {
        fill: answers.color,
      });
    } else if (answers.shape === 'triangle') {
      svg.polygon('50,150 150,150 100,50', {
        fill: answers.color,
      });
    }
    svg.text(20, 180, answers.text, { fill: '#000000' });

    // Save SVG to a file
    const svgString = svg.toString();
    fs.writeFileSync('logo.svg', svgString);
    console.log('Logo generated successfully as logo.svg!');
  })
  .catch((error) => {
    console.error(error);
  });
