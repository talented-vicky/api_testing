const express = require('express');
const axios = require('axios')

const router = express.Router();

router.get('/', (req, res, next) => {
    // just display landing page
    res.render('landing_page', {
        title: 'Home'
    })
});

router.get('/user/profile', async (req, res, next) => {
    req.body = { EnvironmentSatisfaction, JobSatisfaction, WorkLifeBalance, Age,
    BusinessTravel, Department, DistanceFromHome, Education, Gender, JobLevel, 
    JobRole, MaritalStatus, MonthlyIncome, NumCompaniesWorked, PercentSalaryHike, 
    TotalWorkingYears, YearsAtCompany, YearsSinceLastPromotion, YearsWithCurrManager, 
    JobInvolvement, PerformanceRating };
    
    const apimodel = "https://employ-api.onrender.com/predict/";
    try {
        const response = await axios.post(apimodel, {EnvironmentSatisfaction, JobSatisfaction, WorkLifeBalance, Age,
            BusinessTravel, Department, DistanceFromHome, Education, Gender, JobLevel, 
            JobRole, MaritalStatus, MonthlyIncome, NumCompaniesWorked, PercentSalaryHike, 
            TotalWorkingYears, YearsAtCompany, YearsSinceLastPromotion, YearsWithCurrManager, 
            JobInvolvement, PerformanceRating});
    
        console.log(response)
        if(!response){
            const error = new Error('API returned null')
            error.statusCode = 500;
            throw error
        }

        res.render('result', {
            title: "Profile Result",
            tis: '',
            fin: 'sth'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message, msg: "Error fetching api", info: error.info,
        })
    }
});

module.exports = router;

