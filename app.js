const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(cors());

app.post('/BMI', (req, res) => {

    var jsonData = req.body;

    try {

        var overweight_Count = 0;
        var calculated_BMI = jsonData.map((person) => {
            let BMI_value = parseFloat((person.WeightKg / ((person.HeightCm * 0.01) * (person.HeightCm * 0.01))).toFixed(2));
            let BMI_category;
            let health_Risk;

            if (BMI_value <= 18.4) {
                BMI_category = "Underweight";
                health_Risk = "Malnutrition risk";
            } else if (BMI_value >= 18.5 && BMI_value <= 24.9) {
                BMI_category = "Normal weight";
                health_Risk = "Low risk";
            } else if (BMI_value >= 25 && BMI_value <= 29.9) {
                BMI_category = "Overweight";
                health_Risk = "Enhanced risk";
                overweight_Count++;
            } else if (BMI_value >= 30 && BMI_value <= 34.9) {
                BMI_category = "Moderately obese";
                health_Risk = "Medium risk";
            } else if (BMI_value >= 35 && BMI_value <= 29.9) {
                BMI_category = "Severely obese";
                health_Risk = "High risk";
            } else if (BMI_value >= 40) {
                BMI_category = "Very severely obese";
                health_Risk = "Very high risk";
            }
            return {
                ...person,
                BMI_value,
                BMI_category,
                health_Risk
            }

        })

        results = {
            BMIData: calculated_BMI,
            overweight_Count
        };

        res.send({status: "SUCC", data: results , msg : "Successfully Calculated"})

    } catch (err) {
        console.error(err)
        res.send({status: "ERR", msg : String(err)})
    }

})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});