setTimeout(Set_Details, 2000)

function Set_Details() {
	var myHeaders = new Headers();
	myHeaders.append("Cookie", "USA=Ph1GO//HDWoKbzp4uV7WfA==:0MVdWyTtjxYOZ9/n3DZDt6t5a0LSW1z/4xBEAH4DeVT7+XBclYg/hfRn2ZM40t4h; Trx_DT=Xw59YEYk3B8aGxQ/WufFvQ==:qyguLPvPaIQDZ6bFVfVVPlK8q9HPCAQpD8MR8/j4s4Q=;");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch("https://payatoz.in/User/Recharge/Details?skip=0&limit=10", requestOptions)
		.then(response => response.text())
		.then(result => {

			var Recharge_details = JSON.parse(result)

			Update_Numbers(Recharge_details)

			console.log(Recharge_details)
			

			var options = {
				series: [
					{
						name: "Faliure",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					},
					{
						name: "Success",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0]
					}
				],
				chart: {
					height: 300,
					type: 'line',
					zoom: {
						enabled: false,
					},
					dropShadow: {
						enabled: true,
						color: '#000',
						top: 18,
						left: 7,
						blur: 16,
						opacity: 0.2
					},
					toolbar: {
						show: false
					}
				},
				colors: ['#e85347', '#3faa54'],
				dataLabels: {
					enabled: false,
				},
				stroke: {
					width: [3, 3],
					curve: 'smooth'
				},
				grid: {
					show: false,
				},
				markers: {
					colors: ['#e85347', '#3faa54'],
					size: 5,
					strokeColors: '#ffffff',
					strokeWidth: 2,
					hover: {
						sizeOffset: 2
					}
				},
				xaxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					labels: {
						style: {
							colors: '#8c9094'
						}
					}
				},
				yaxis: {
					min: 0,
					max: 35,
					labels: {
						style: {
							colors: '#8c9094'
						}
					}
				},
				legend: {
					position: 'top',
					horizontalAlign: 'right',
					floating: true,
					offsetY: 0,
					labels: {
						useSeriesColors: true
					},
					markers: {
						width: 10,
						height: 10,
					}
				}
			};

			var options4 = {
				series: [Recharge_details.response.Recharge_Count.success, Recharge_details.response.Recharge_Count.failure, Recharge_details.response.Recharge_Count.processing, Recharge_details.response.Recharge_Count.success + Recharge_details.response.Recharge_Count.failure],
				chart: {
					height: 350,
					type: 'radialBar',
				},
				colors: ['#003049', '#d62828', '#f77f00', '#fcbf49', '#e76f51'],
				plotOptions: {
					radialBar: {
						dataLabels: {
							name: {
								fontSize: '22px',
							},
							value: {
								fontSize: '16px',
							},
							total: {
								show: false,
								label: 'Report',
								formatter: function (w) {
									return 260
								}
							}
						}
					}
				},
				labels: ['Success', 'Failure', 'Processing', 'Total'],
			};

			var chart = new ApexCharts(document.querySelector("#activities-chart"), options);
			chart.render();



			var chart4 = new ApexCharts(document.querySelector("#diseases-chart"), options4);
			chart4.render();

			// datatable init
			$('document').ready(function () {
				$('.data-table').DataTable({
					scrollCollapse: false,
					autoWidth: false,
					responsive: true,
					searching: false,
					bLengthChange: false,
					bPaginate: true,
					bInfo: false,
					columnDefs: [{
						targets: "datatable-nosort",
						orderable: false,
					}],
					"lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],
					"language": {
						"info": "_START_-_END_ of _TOTAL_ entries",
						searchPlaceholder: "Search",
						paginate: {
							next: '<i class="ion-chevron-right"></i>',
							previous: '<i class="ion-chevron-left"></i>'
						}
					},
				});
			});
		})
		.catch(error => console.log('error', error));



}
function Update_Numbers(Recharge_details) {
	document.getElementById('total').innerHTML = Recharge_details.response.Recharge_Count.success +  Recharge_details.response.Recharge_Count.failure
	document.getElementById('Success').innerHTML = Recharge_details.response.Recharge_Count.success
	document.getElementById('Fail').innerHTML =  Recharge_details.response.Recharge_Count.failure
	document.getElementById('Proccessing').innerHTML = Recharge_details.response.Recharge_Count.processing
}