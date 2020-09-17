window.onload = getData();

function getData(){
    const fetchPromise = fetch("https://api.thevirustracker.com/free-api?countryTimeline=NZ");
    const streamPromise = fetchPromise.then((response)=> response.json());
    streamPromise.then(data => {
        console.log(data);
        displayData(data.timelineitems[0]);
    });
}

function displayData(data){
    let len = Object.keys(data).length;
    let dates = Object.keys(data); //Array of dates
    let today = dates[len-2];
    formatToday(today);
    let newCases = data[today].new_daily_cases;
    let newDeaths = data[today].new_daily_deaths;
    let totalCases = data[today].total_cases;
    let totalRecoveries = data[today].total_recoveries;
    let totalDeaths = data[today].total_deaths;
    let activeCases = totalCases - totalRecoveries;
    formatData(newCases, newDeaths, totalCases, totalRecoveries, totalDeaths, activeCases);

    //To do a cumulative graph, make everything a proportion of the latest value (total cases) so everything goes from 0 to 1 on the scale
    //Draw the graph
    let maxheight = 200;
    let height = 0;
    let yroot = 500;
    let spread = 695/len;
    console.log(spread);
    let xpos = 5;

    dates.forEach(function(item) {
        
        let values = data[item];//array of values
        let ratio = values.total_cases/totalCases;
        
        if(item == "stat"){
            let height = 0;
        }
        else{
            height = yroot - (300 * ratio);
        }
        var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
        line.setAttributeNS(null, 'x1',xpos);
        line.setAttributeNS(null, 'y1', yroot);
        line.setAttributeNS(null, 'x2',xpos);
        line.setAttributeNS(null, 'y2', height);
        line.setAttributeNS(null, 'stroke','blue');
        line.setAttributeNS(null, 'stroke-width','3');
        document.getElementById('chart').appendChild(line);
        xpos = xpos + spread;
 
})

}

function formatToday(date){
    let dateTag = document.createElement("P");
    let dateText = document.createTextNode("COVID-19 Live Tracker " + date);
    dateTag.appendChild(dateText);
    document.getElementById("date-text").appendChild(dateTag).className="date";
}

function formatData(newCases, newDeaths, totalCases, totalRecoveries, totalDeaths, activeCases){
    let newCasesTag = document.createElement("P");
    let newDeathsTag = document.createElement("P");
    let totalCasesTag = document.createElement("P");
    let totalRevoveriesTag = document.createElement("P");
    let totalDeathsTag = document.createElement("P");
    let activeCasesTag = document.createElement("P");
    let casesTag = document.createElement("P");

    let newCasesText = document.createTextNode("+" + newCases);
    let newDeathsText = document.createTextNode("+" + newDeaths);
    let totalCasesText = document.createTextNode(totalCases);
    let totalRecoveriesText = document.createTextNode(totalRecoveries);
    let totalDeathsText = document.createTextNode(totalDeaths);
    let activeCasesText = document.createTextNode(activeCases);
    let casesText = document.createTextNode("+" + newCases);

    newCasesTag.appendChild(newCasesText);
    newDeathsTag.appendChild(newDeathsText);
    totalCasesTag.appendChild(totalCasesText);
    totalRevoveriesTag.appendChild(totalRecoveriesText);
    totalDeathsTag.appendChild(totalDeathsText);
    activeCasesTag.appendChild(activeCasesText);
    casesTag.appendChild(casesText);

    document.getElementById("active-cases").appendChild(activeCasesTag).className="activeCases";
    document.getElementById("active-cases").appendChild(newCasesTag).className="newCases";
    document.getElementById("total-cases").appendChild(totalCasesTag).className="totalCases";
    document.getElementById("total-cases").appendChild(casesTag).className="newCases";
    document.getElementById("recovered").appendChild(totalRevoveriesTag).className="totalRecoveries";
    document.getElementById("deaths").appendChild(totalDeathsTag).className="totalDeaths";
    document.getElementById("deaths").appendChild(newDeathsTag).className="newDeaths";

}
