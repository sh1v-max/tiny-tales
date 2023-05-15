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
          .replace(/[^\w\s]/g, "") // remove all special characters
          .split(/\s+/); // split by whitespace
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
            width={800}
            height={400}
            data={histogramData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <button onClick={handleExport}>Export</button>
        </>
      )}
    </div>
  );
}

export default App;






// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [wordCounts, setWordCounts] = useState([]);
//   const [csvData, setCsvData] = useState("");

//   const handleFetchData = () => {
//     axios
//       .get("https://www.terriblytinytales.com/test.txt")
//       .then((response) => {
//         const data = response.data;
//         const words = data
//           .toLowerCase()
//           .replace(/[^\w\s]/g, "")
//           .split(/\s+/);
//         const wordCountMap = {};
//         words.forEach((word) => {
//           wordCountMap[word] = (wordCountMap[word] || 0) + 1;
//         });
//         const wordCountsArray = Object.keys(wordCountMap).map((word) => ({
//           word,
//           count: wordCountMap[word],
//         }));
//         wordCountsArray.sort((a, b) => b.count - a.count);
//         setWordCounts(wordCountsArray.slice(0, 20));
//         setCsvData(
//           "Word,Count\n" +
//             wordCountsArray
//               .slice(0, 20)
//               .map((entry) => `${entry.word},${entry.count}`)
//               .join("\n")
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleExport = () => {
//     const blob = new Blob([csvData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "histogram.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <button onClick={handleFetchData}>Submit</button>
//       {wordCounts.length > 0 && (
//         <>
//           <h2>Top 20 Most Frequent Words</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Word</th>
//                 <th>Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {wordCounts.map((entry) => (
//                 <tr key={entry.word}>
//                   <td>{entry.word}</td>
//                   <td>{entry.count}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleExport}>Export</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
