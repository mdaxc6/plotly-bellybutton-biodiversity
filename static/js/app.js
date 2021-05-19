d3.json("../plotly-challenge/samples.json").then(function(samples){
    var names = samples.names;
    names.forEach(name => {
        d3.select("#selDataset").append("option").text(name);
    });

    init(samples);
});

// numArray.sort(function compareFunction(firstNum, secondNum) {
//     // resulting order is (3, 2, 1)
//     return secondNum - firstNum;
//   });

function plotData(samples){
    var selectNode = d3.select("#selDataset");

    var sampleID = selectNode.property("value");

    var sampleData = samples["samples"].filter(sample => sample.id == sampleID);

    var yData = sampleData[0].otu_ids.slice(0,10);
    var yLabels = [];

    console.log(yData)

    yData.forEach(function(sample){
        yLabels.push(`OTU ${sample.toString()}`);
    });

    console.log(yLabels)

    var trace = {
        x: sampleData[0].sample_values.slice(0,10).reverse(),
        y: yLabels.reverse(),
        text: sampleData[0].otu_labels.slice(0,10),
        type: "bar",
        orientation: "h"
    };

    var chartData = [trace];

    return chartData;
}


function init(samples){
    var chartData = plotData(samples);
    Plotly.newPlot("bar", chartData);
}


