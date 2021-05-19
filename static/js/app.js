d3.json("../plotly-challenge/samples.json").then(function(samples){
    var names = samples.names;
    names.forEach(name => {
        d3.select("#selDataset").append("option").text(name);
    });

    init(samples);
});

function getSample(samples){
    var selectNode = d3.select("#selDataset");
    var sampleID = selectNode.property("value");
    var sampleData = samples["samples"].filter(sample => sample.id == sampleID);
    return sampleData;
}

function getMeta(samples){
    var selectNode = d3.select("#selDataset");
    var sampleID = selectNode.property("value");
    var metadata = samples["metadata"].filter(sample => sample.id == sampleID);
    
    var metaDiv = d3.select("#sample-metadata");
    console.log(metadata[0])
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

    return barData;
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

    return bubbleData;
    
}


function init(samples){
    var barData = plotBar(samples);
    Plotly.newPlot("bar", barData);

    var bubbleData = plotBubble(samples);
    Plotly.newPlot("bubble", bubbleData);

    getMeta(samples);
}


