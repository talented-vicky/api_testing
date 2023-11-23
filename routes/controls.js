const express = require('express');
const axios = require('axios')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('landing_page', {
        title: 'Home'
    })
});

router.post('/user/profile', async (req, res) => {
    const { Age, Gender, EnvironmentSatisfaction, JobSatisfaction, WorkLifeBalance,
    BusinessTravel, Department, DistanceFromHome, Education, JobLevel, 
    JobRole, MaritalStatus, MonthlyIncome, NumCompaniesWorked, PercentSalaryHike, 
    TotalWorkingYears, YearsAtCompany, YearsSinceLastPromotion, YearsWithCurrManager, 
    JobInvolvement, PerformanceRating } = req.body;

    console.log(Age)
    console.log(EnvironmentSatisfaction)
    
    const apimodel = "https://employ-api.onrender.com/predict/";
    try {
        const response = await axios.post(apimodel, {
            EnvironmentSatisfaction: Number(EnvironmentSatisfaction), JobSatisfaction: Number(JobSatisfaction), 
            WorkLifeBalance: Number(WorkLifeBalance), Age: Number(Age), BusinessTravel: Number(BusinessTravel), 
            Department: Number(Department), DistanceFromHome: Number(DistanceFromHome), 
            Education: Number(Education), Gender: Number(Gender), JobLevel: Number(JobLevel), 
            JobRole: Number(JobRole), MaritalStatus: Number(MaritalStatus), MonthlyIncome:  Number(MonthlyIncome), 
            NumCompaniesWorked: Number(NumCompaniesWorked), PercentSalaryHike: Number(PercentSalaryHike), 
            TotalWorkingYears: Number(TotalWorkingYears), YearsAtCompany: Number(YearsAtCompany), 
            YearsSinceLastPromotion: Number(YearsSinceLastPromotion), YearsWithCurrManager: Number(YearsWithCurrManager), 
            JobInvolvement: Number(JobInvolvement), PerformanceRating: Number(PerformanceRating)
        });
    
        console.log(response)
        if(!response){
            const error = new Error('API returned null')
            error.statusCode = 500;
            throw error
        }
        const value = response.body

        res.render('result', {
            title: "Result", value
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error posting to API", 
            info: error.message,
        })
    }
});

module.exports = router;

