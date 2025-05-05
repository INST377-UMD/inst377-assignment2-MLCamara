// Stock Search + Chart

let chartInstance = null;

const dateFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() +1 ).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};


async function fetchStock() {
    const stocks = document.getElementById("stocks").value.toUpperCase().trim();
    const date = document.getElementById("date").value; 

    console.log("Stock entered:", stocks);
    console.log("Date entered:", date); 
    
    if (!stocks || stocks.length > 5) {
        alert("Please enter a stock up to 5 characters");
        return;
    }

    const presentDate = new Date();
    const endDate = new Date();

    
    if (date === "30Days") {
        presentDate.setDate(endDate.getDate() - 30);
    } else if (date === "60Days") {
        presentDate.setDate(endDate.getDate() - 60);
    } else if (date === "90Days") {
        presentDate.setDate(endDate.getDate() - 90);
    }

    const formatPresentDate = dateFormat(presentDate);
    const formatEndDate = dateFormat(endDate);

    const api = `https://api.polygon.io/v2/aggs/ticker/${stocks}/range/1/day/${formatPresentDate}/${formatEndDate}?apiKey=b2UI4U0OhNy3rKyOPZUc0wnuwoDO10eK`;


    try {
        const response = await fetch(api);
        const data = await response.json();

        console.log("Results:", data);


        const labels = data.results.map(item => dateFormat(new Date(item.t)));
        const values = data.results.map(item => item.c);
    
        drawChart(labels,values);

        const chartDiv = document.getElementById("chartDiv")
        chartDiv.style.backgroundColor = "white";

    } catch (error) {
        console.error("Error",error);
    }
}


function drawChart(labels, values) {
    const chart = document.getElementById("myChart");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(chart, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "($) Stock Price",
                data: values
            }]
        },
    });

}




// Top 5 Stocks Table
fetch ('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(response => response.json())
    .then(data => {
        console.log("data:", data);

        const stocks = data.slice(0,5);
        const table = document.getElementById("topStocks");

        stocks.forEach(topstocks =>{
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><a href = "https://finance.yahoo.com/quote/${topstocks.ticker}" target = "_blank"> 
                ${topstocks.ticker}
                                                </a></td>

                <td>${topstocks.no_of_comments}</td>

                <td>${topstocks.sentiment === "Bullish"
                    ? "<img src = Bullish.png alt = Bullish >"
                    : "<img src = bearish.png alt = Bearish >"
                                                }</td>
            `;

            table.appendChild(row);
        }); 

    });