import { LightningElement, track, api } from 'lwc';
import BMIImage from '@salesforce/resourceUrl/BMI';

export default class BMICalculator extends LightningElement {

    imageUrl = BMIImage;
    @track height = 0;
    @track weight = 0;
    @api result = 0;
    @track showResults = false; // Controls when BMI values should be displayed

    get backgroundStyle() {
        return `background-image: url('${this.imageUrl}'); background-size: cover; background-repeat: no-repeat;`;
    } 
    get isUnderweight() {
        return this.showResults && this.result < 18.5;
    }

    get isHealthy() {
        return this.showResults && this.result >= 18.5 && this.result < 25;
    }

    get isOverweight() {
        return this.showResults && this.result >= 25 && this.result < 30;
    }
    get heightWeight(){
        return !this.showResults;
    }

    handleHeight(event){
        this.height = parseFloat(event.target.value) || 0;
        this.showResults = false; // Reset results when user types

    }
    handleWeight(event){
        this.weight = parseFloat(event.target.value) || 0;
        this.showResults = false; // Reset results when user types

    }

     handleCalculateClick(event){
        let inputField = this.template.querySelector('[data-id="heightInput"]');  //Select the input field using data-id
        if (this.height < 0) {
            inputField.setCustomValidity("Height cannot be negative!");
        } else {
            inputField.setCustomValidity(""); // Clear error if valid
        }
        let inputWeight = this.template.querySelector('[data-id="weightInput"]');  //Select the input field using data-id
         if (this.weight < 0) {
            inputWeight.setCustomValidity("Weight cannot be negative!");
        } else {
            inputWeight.setCustomValidity(""); // Clear error if valid
        }

        inputField.reportValidity();
        inputWeight.reportValidity();
        
        if (this.height > 0 && this.weight > 0) {
            this.result = parseFloat((this.weight / ((this.height / 100) ** 2)).toFixed(2));
            this.showResults = true; // Now show BMI categories
        } else if(this.height < 0 && this.weight > 0) {
            this.result = "Invalid Height"
        } else if(this.weight < 0 && this.height > 0) {
            this.result = "Invalid Weight"
        } else {
            this.result = "Invalid Height And Weight";
        }
    }    
}