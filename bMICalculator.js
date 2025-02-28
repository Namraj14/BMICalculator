import { LightningElement, track } from 'lwc';
import BMIImage from '@salesforce/resourceUrl/BMI';

export default class BMICalculator extends LightningElement {

    imageUrl = BMIImage;
    @track height = 0;
    @track weight = 0;
    result = 0;

    get backgroundStyle() {
        return `background-image: url(${this.imageUrl}); background-size: cover; background-repeat: no-repeat;`;
    }

    handleHeight(event){
        this.height = event.target.value
    }
    handleWeight(event){
        this.weight = event.target.value
    }

    handleCalculateClick(event){
        this.result = (this.weight / (this.height * this.height));
    }
}