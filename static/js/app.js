var jsonFile = "../plotly-challenge/samples.json"

//Init
d3.json(jsonFile).then(function(samples){
    var names = samples.names;
    names.forEach(name => {
        d3.select("#selDataset").append("option").text(name);
    });

    init(samples);
});


function getSample(samples){
    var sampleID = d3.select("#selDataset").property("value");
    var sampleData = samples["samples"].filter(sample => sample.id == sampleID);
    return sampleData;
}

function getMeta(samples){
    var sampleID = d3.select("#selDataset").property("value");
    var metadata = samples["metadata"].filter(sample => sample.id == sampleID);
    
    var metaDiv = d3.select("#sample-metadata");
    metaDiv.selectAll("p").remove();
    Object.entries(metadata[0]).forEach(([key, value]) => {
        metaDiv.append("p")
            .html(`<b>${key}: ${value}</b>`);
    });

}

function plotBar(samples){

    var sampleData = getSample(samples);

    // add labels to y data
    var yData = sampleData[0].otu_ids.slice(0,10);
    var yLabels = [];
    yData.forEach(function(sample){
        yLabels.push(`OTU ${sample.toString()}`);
    });

    var barTrace = {
        x: sampleData[0].sample_values.slice(0,10).reverse(),
        y: yLabels.reverse(),
        text: sampleData[0].otu_labels.slice(0,10),
        type: "bar",
        orientation: "h"
    };

    var barData = [barTrace];

    Plotly.newPlot("bar", barData);
}

function plotBubble(samples){
    var sampleData = getSample(samples);

    var bubbleTrace = {
        x: sampleData[0].otu_ids,
        y: sampleData[0].sample_values,
        mode: 'markers',
        marker: {
            size: sampleData[0].sample_values,
            color: sampleData[0].otu_ids,
        },
        text: sampleData[0].otu_labels
    };
    
    var bubbleData = [bubbleTrace];

    Plotly.newPlot("bubble", bubbleData);
}

function plotGauge(samples){

    var sampleID = d3.select("#selDataset").property("value");
    var metadata = samples["metadata"].filter(sample => sample.id == sampleID);

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata[0].wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge",
          gauge: {
            axis: { range: [0, 9] },
            steps: [
              { range: [0, 1], color: "#e0e069" },
              { range: [1, 2], color: "#cbd665" },
              { range: [2, 3], color: "#b7cc62" },
              { range: [3, 4], color: "#a4c160" },
              { range: [4, 5], color: "#92b65d" },
              { range: [5, 6], color: "#80ab5a" },
              { range: [6, 7], color: "#70a058" },
              { range: [7, 8], color: "#609555" },
              { range: [8, 9], color: "#518a52" },
            ]
          }
        }
      ];
      
      var layout = { width: 500, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}

function init(samples){
    plotBar(samples);
    plotBubble(samples);
    getMeta(samples);
    plotGauge(samples);
}

function optionChanged(){
    d3.json(jsonFile).then(samples =>{
        init(samples);
    });
}
