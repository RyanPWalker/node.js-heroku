function dothething() {
	openRate = [
            {
                value: 1,
                color: "#FF9030",
                highlight: "rgba(255, 144, 48, 0.44)",
            },
            {
                value: 1,
                color: "#008DB7",
                highlight: "rgba(0, 141, 183, 0.82)"
            },
            {
                value: 1,
                color: "red",
                highlight: "rgba(255, 144, 48, 0.44)",
            },
            {
                value: 1,
                color: "yellow",
                highlight: "rgba(255, 144, 48, 0.44)",
            }
        ];

	var ctx=document.getElementById('coolcanvas');
	var chart=new Chart(ctx).Pie(openRate);
}


//why wont this wooork
