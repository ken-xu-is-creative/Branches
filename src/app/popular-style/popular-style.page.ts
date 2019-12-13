import { Component, OnInit  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, ToastController } from '@ionic/angular';
import { PopularStyleService } from '../popular-style.service';



@Component({
  selector: 'app-popular-style',
  templateUrl: './popular-style.page.html',
  styleUrls: ['./popular-style.page.scss'],
})
export class PopularStylePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private popularStylesService: PopularStyleService
  ) { }

  popular: any[];

  public async ngOnInit(): Promise<void> {
    this.loadData();
  }

   /**
   * ...
   *
   * @param index ...
   */

  /**
   * ...
   *
   * @param event ...
   */
  public doReorder(event: any): void {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    this.popularStylesService.moveItem(event.detail.from, event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  /**
   * ...
   *
   * @param item ...
   */

  /**
   * ...
   *
   * @param event ...
   * @param index ...
   */

  /**
   * ...
   *
   * @param event ...
   * @param index ...
   */

  /**
   * ...
   */
  public dismissModal(): void {
    this.modalController.dismiss();
  }



  private async loadData(): Promise<void> {
    this.popular = await this.popularStylesService.getAllPopularStyles();
  }

}
