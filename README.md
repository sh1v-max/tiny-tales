# The project was all about creating:- 

* 1.On first load, only has a Submit button
* 2.On clicking on Submit, it will fetch the contents of https://www.terriblytinytales.com/test.txt
* 3.Parse the content and find the frequency of occurrence of each word (some words will occur only once, some   twice and so on, and some will occur N times)
* 4.Then on the frontend, plot a histogram of the 20 most occurring words.
* 5.Also build an "Export" button, which when clicked will download a CSV file of the histogram data.
X-axis = top 20 words with highest occurrence Y-axis = how many times they occurred in the file

 ReactJs offers us a great variety of libraries, plug-ins and modules for us to work upon.
ReactJS is a JavaScript library used for building user interfaces for web applications. It was developed by Facebook and is widely used by developers to create dynamic and interactive UI components. React allows developers to build reusable UI components and efficiently update and render them when the underlying data changes.

React follows a component-based architecture, where the UI is broken down into small, self-contained components. Each component can have its own state, properties, and lifecycle methods. React uses a virtual DOM (Document Object Model) to efficiently update and render only the necessary parts of the user interface, resulting in better performance.

## Components

```
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';
import Style from './style.css';
```

This section imports the necessary dependencies for the code. It imports React, the useState hook for managing component state, axios for making HTTP requests, react-chartjs-2 for rendering the bar chart, file-saver for saving files, and the necessary styles.

```
const App = () => {
const [chartData, setChartData] = useState(null);
const [wordCount, setWordCount] = useState(null);
}
```

The App component is defined as an arrow function. It initializes two state variables, 'chartData' and 'wordCount', using the 'useState' hook. The initial values are set to 'null'.
```
const fetchData = async () => {
  try {
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const content = response.data;
    const words = content.split(/\s+/);
    const wordCountMap = {};
    words.forEach(word => {
      const cleanedWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      if (cleanedWord !== '') {
        wordCountMap[cleanedWord] = (wordCountMap[cleanedWord] || 0) + 1;
     }
    });

  } catch (error) {
    console.error('Error:', error);
  }
};
```

The 'fetchData' function is an asynchronous function that is triggered when the "Submit" button is clicked. It uses the 'axios.get' method to fetch data from the provided URL (https://www.terriblytinytales.com/test.txt).
After receiving the response, it extracts the content from the response and splits it into an array of words. Then, it creates a 'wordCountMap' object to store the count of each word. It iterates over the words, cleans them by converting to lowercase and removing non-alphanumeric characters, and updates the word count in the 'wordCountMap'.

```
const sortedWords = Object.keys(wordCountMap).sort((a, b) => wordCountMap[b] - wordCountMap[a]);
const labels = sortedWords.slice(0, 20);
const data = labels.map(word => wordCountMap[word]);

const chartData = {
  labels,
  datasets: [
   {
      label: 'Word Frequency',
      data,
      backgroundColor: 'rgba(59, 121, 127 )',
    },
  ],
};

setChartData(chartData);
setWordCount(wordCountMap);
```


This section generates the data required for the bar chart. It first sorts the words in descending order based on their frequency count. It selects the top 20 words from the sorted list as labels and retrieves their corresponding counts as data.
The chartData object is created with the labels and datasets properties. The labels contain the words, and the datasets array contains an object with the label

# To run the code:-

```
npm start
```










