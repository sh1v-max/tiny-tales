# In this project i have implemented Reactjs to do following task:- 

* 1.On first load, only has a Submit button
* 2.On clicking on Submit, it will fetch the contents of https://www.terriblytinytales.com/test.txt
* 3.Parse the content and find the frequency of occurrence of each word (some words will occur only once, some   twice and so on, and some will occur N times)
* 4.Then on the frontend, plot a histogram of the 20 most occurring words.
* 5.Also build an "Export" button, which when clicked will download a CSV file of the histogram data.
X-axis = top 20 words with highest occurrence Y-axis = how many times they occurred in the file

## Live Project: https://tiny-tales.onrender.com



## Components

```
const fetchData = () => {

    axios
      .get("https://www.terriblytinytales.com/test.txt")
      .then((response) => {
        const data = response.data;
        const words = data
          .toLowerCase()
          .replace(/[^\w\s]/g, "") 
          .split(/\s+/); 
        const wordFreq = {};
        words.forEach((word) => {
          if (!wordFreq[word]) {
            wordFreq[word] = 0;
          }
          wordFreq[word]++;
        });
        const sortedWordFreq = Object.entries(wordFreq).sort(
          (a, b) => b[1] - a[1]
        );
        const top20Words = sortedWordFreq.slice(0, 20).map((entry) => {
          return { word: entry[0], count: entry[1] };
        });
        setHistogramData(top20Words);
        setCsvData(
          "Word,Count\n" +
            top20Words.map((entry) => entry.word + "," + entry.count).join("\n")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
```

* `fetchData` function: This function is responsible for fetching the data from the URL https://www.terriblytinytales.com/test.txt using the axios library. It then processes the received text by
converting it to lowercase, removing non alphanumeric characters, and splitting it into words. It calculates the frequency of each word and stores it in `wordFreq` object. The `wordFreq` object
is then sorted in descending order of word frequency, and the top 20 words are extracted and stored in the `top20Words` array. Finally, the histogramData state is updated with `top20Words`, and
csvData is updated with the CSV-formatted string.


```
  const handleExport = () => {

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "histogram.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
```


* `handleExport` function: This function is triggered when the "Download CSV file" button is clicked. It creates a Blob object with the CSV data and creates a URL for the object. Then, it creates
a hidden `a` element, sets the URL and the file name for downloading, appends it to the document body, triggers a click event on the link, and removes the link from the document body.

```
return (

    <div>
      <button onClick={fetchData}>Submit</button>
      {histogramData.length > 0 && (
        <>
          <BarChart
            width={1200}
            height={500}
            data={histogramData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#34ebd8" />
          </BarChart>
          <button onClick={handleExport}>Download CSV file</button>
        </>
      )}
    </div>
  );
```

* `Render`: The render function returns JSX, which defines the structure and behavior of the component. It consists of a `div` element containing a "Submit" button and conditional rendering of
the bar chart and the "Download CSV file" button. When the "Submit" button is clicked, it calls the` fetchData` function. If the `histogramData` state is not empty, it renders the `BarChart`
component from Recharts, passing the `histogramData` as the data prop. It also renders a "Download CSV file" button, which triggers the `handleExport` function when clicked.

## dependencies installed:-
Make sure you have the `react`, `axios`, and `recharts` installed and that you've set up the React environment properly to use this component.

# To run the code:-

```
npm start
```










