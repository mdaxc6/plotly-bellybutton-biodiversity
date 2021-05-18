d3.json("../plotly-challenge/samples.json").then(function(samples){
    var names = samples.names;
    names.forEach(name => {
        d3.select("#selDataset").append("option").text(name);
    });

    init(samples);
});


function plotData(samples){
    var selectNode = d3.select("#selDataset");

    var sampleID = selectNode.property("value");

    var sampleData = samples["samples"].filter(sample => sample.id == sampleID);

    console.log(sampleData[0].otu_ids.slice(0,10).toString());

    var yData = sampleData[0].otu_ids.slice(0,10).forEach(id => `OTU ${toString(id)}`);

    console.log(yData)

    var trace = {
        x: sampleData[0].sample_values.slice(0,10),
        y: yData,
        text: sampleData[0].otu_labels.slice(0,10),
        type: "bar",
        orientation: "h"
    };

    var chartData = [trace];

    return chartData;
}


function init(samples){
    var chartData = plotData(samples);
    var layout = {tickmode: "array"}
    Plotly.newPlot("bar", chartData);
}


