class Perceptron {
    // Weights are arrays of length x
    // Training data is an array of y rows of length x
    // Expected results is an array of length y
    // bias is a float
    constructor(weights, trainingData, expectedResults, bias) {
        this.weights = weights;
        console.log('Perceptron weights: ');
        let i = 0;
        for(let weight of weights){
            console.log('W' + i + ': ' + weight + ' ');
            i++;
        }
        this.expectedResults = expectedResults;
        this.trainingData = trainingData;
        // position in training data set
        this.dataPos = 0;
        this.learningRate = 0.1;
        this.bias = bias;
    }
    // Checks the validity of the result and 
    // returns a boolean
    valid(datum, result) {
        return (datum[0] > datum[1] && result > 0) || (datum[0] < datum[1] && result < 0) ? true : false;
    }
    // The activation function - takes a floating point value as input
    activation(input) {
        return input >= 0 ? 1 : -1;
    }
    /*
    Takes an array of floats as input
    the datum is 1 row of the training data or any single array input data
    */
    processData(datum){
        let sum = 0;
           for(let i = 0; i < this.weights.length; i++) {
              sum += this.weights[i] * datum[i];
           }
        let result = this.activation(sum);
        console.log('x: ' + datum[0] + ' y: ' + datum[1]);
        console.log('Output: ' + result);
        return result;
    }
    /*
    Take the training data and adjust the weights to get the appropriate
    result.
    */
    train() {
        let output = new Object();
        if (this.dataPos > this.trainingData.length - 1) {
            return output;
        }
        let result = this.processData(this.trainingData[this.dataPos]);
        for(let i = 0; i < this.weights.length; i++){
            let error = this.expectedResults[this.dataPos] - result;
            console.log('Error: ' + error);
            console.log('Old weight: ' + this.weights[i]);
            this.weights[i] += error * this.trainingData[this.dataPos][i] * this.learningRate;
            console.log('training data value: ' + this.trainingData[this.dataPos][i]);
            console.log('New weight: ' + this.weights[i]);
        }
        
        output.x = this.trainingData[this.dataPos][0];
        output.y = this.trainingData[this.dataPos][1];
        output.success = result == this.expectedResults[this.dataPos];
        this.dataPos++;
        return output;
    }
}
