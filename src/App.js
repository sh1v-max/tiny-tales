import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [histogramData, setHistogramData] = useState([]);
  const [csvData, setCsvData] = useState("");

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
}

export default App;
