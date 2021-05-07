const express = require('express');
const chai = require('chai');
const request = require('supertest');

const app = express();


describe('POST : Calculates BMI',  () => {
    it('should return status : "SUCC"', () => {
        request(app)
        .post('/BMI')
        .send([
            {
            "Gender": "Male",
            "HeightCm": 175,
            "WeightKg": 75
          },
          {
            "Gender": "Male",
            "HeightCm": 171,
            "WeightKg": 96
          },
          {
            "Gender": "Male",
            "HeightCm": 161,
            "WeightKg": 85
          },
          {
            "Gender": "Male",
            "HeightCm": 180,
            "WeightKg": 77
          },
          {
            "Gender": "Female",
            "HeightCm": 166,
            "WeightKg": 62
          },
          {
            "Gender": "Female",
            "HeightCm": 150,
            "WeightKg": 70
          },
          {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 82
          }
        ])
        .expect(200)
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.equals("SUCC");
         });
    });
 });
