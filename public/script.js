document.getElementById("flightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const flightsInput = document.getElementById("flightsInput").value;
  const resultElement = document.getElementById("result");

  try {
    const response = await fetch("/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flights: flightsInput }),
    });

    if (!response.ok) {
      throw new Error(
        'Failed to calculate flight path: Enter flights in a format like [["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]]'
      );
    }

    const data = await response.json();
    // console.log("dattaaaa:", data.flightPath);
    let temp = "[" + data.flightPath.join(", ") + "]";
    if (temp === "[, ]") {
      resultElement.textContent = `Error: Provided flight path is Circular`;
    } else {
      resultElement.textContent = temp;
    }
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
});
