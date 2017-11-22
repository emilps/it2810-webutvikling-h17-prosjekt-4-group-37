import { Component, OnInit } from '@angular/core';
//Imports of services
import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	// state changing if chart data is uppdated
	isDataAvailable: boolean = false;
  //chart colors
	public chartColors: any[] = [{
		backgroundColor: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"]
	}];
  //Chart options. Choosing a narrower circle and positions information text to the right
	public options = {
		cutoutPercentage: 75,
		legend: { position: 'right' }
	};
  //A list of contries for the chart
	public doughnutChartLabels: string[] = ['Italia', 'Tyskland', 'Spania', 'Frankrike', 'Annet'];
  //data of each contry.
  public doughnutChartData: number[] = [0, 0, 0, 0, 0];
  //declares type of chart to, doughnut
	public doughnutChartType: string = 'doughnut';
  //List of favorites wines.
	public wines: any;
  //Initializes services used for data retriveal
	constructor(public profileService: ProfileService, public favoriteWineService: FavoriteWineService) { }

  //On init running getWineInfo function
	ngOnInit() {
		this.getWineInfo();
	}

	//Function that retrives wines from favorite wine list.
  //If the list is not empty running updateChart.
	async getWineInfo() {
		await this.favoriteWineService.getFavoriteWines().subscribe(res => {
			this.wines = res
			if (this.wines.length) {
				this.updateChart();
			}
		});
	}
  //Counts amount of wine countries. Checks the major contries in our db.
  //After update isDataAvailable  changes to true. Then shows the chart.
	updateChart() {
		for (var i = 0; i < this.wines.length; i++) {
			if (this.wines[i].Land == 'Italia') {
				this.doughnutChartData[0] += 1
			} else if (this.wines[i].Land == 'Tyskland') {
				this.doughnutChartData[1] += 1
			} else if (this.wines[i].Land == 'Spania') {
				this.doughnutChartData[2] += 1
			} else if (this.wines[i].Land == 'Frankrike') {
				this.doughnutChartData[3] += 1
			} else {
				this.doughnutChartData[4] += 1
			}
		}
		this.isDataAvailable = true;
	}
}
