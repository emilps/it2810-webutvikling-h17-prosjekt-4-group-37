import { Component, OnInit } from '@angular/core';
import {ProfileService} from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // Doughnut
  isDataAvailable:boolean = false;
  public chartColors: any[] = [{
    backgroundColor:["#450027", "#590030", "#6E1739", "#202741", "#3c191d"]
      }];
  public options = {
    cutoutPercentage: 75,
    legend: {position: 'right'}
  };

  public doughnutChartLabels:string[] = ['Italia', 'Tyskland', 'Spania', 'Frankrike', 'Annet'];
  public doughnutChartData:number[] = [0, 0, 0, 0, 0];
  public doughnutChartType:string = 'doughnut';
  public wines: any;
  constructor(public profileService: ProfileService, public favoriteWineService: FavoriteWineService) { }

  ngOnInit() {
    this.getWineInfo();
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  async getWineInfo(){
    await this.favoriteWineService.getFavoriteWines().subscribe(res => {
      this.wines = res
      this.updateChart();
    });

  }
  updateChart(){
    for(var i=0; i<this.wines.length; i++){
      if(this.wines[i].Land == 'Italia'){
        this.doughnutChartData[0] += 1
      }else if(this.wines[i].Land == 'Tyskland'){
        this.doughnutChartData[1] += 1
      }else if(this.wines[i].Land == 'Spania'){
        this.doughnutChartData[2] += 1
      }else if(this.wines[i].Land == 'Frankrike'){
        this.doughnutChartData[3] += 1
      }else{
        this.doughnutChartData[4] += 1
      }
  }
  this.isDataAvailable = true;
}




}
