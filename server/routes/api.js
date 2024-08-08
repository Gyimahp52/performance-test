const express = require('express');
const router = express.Router();

// Sample data structure for demonstration purposes
const performanceData = [
    { id: 1, page: 'baseline', loadTime: 1000, pageSize: 1500 },
    { id: 2, page: 'lazy', loadTime: 800, pageSize: 1200 },
    { id: 3, page: 'minified', loadTime: 600, pageSize: 1000 },
    { id: 4, page: 'combined', loadTime: 500, pageSize: 800 }
];

// GET all performance data
router.get('/data', (req, res) => {
    res.json(performanceData);
});

// GET performance data by page
router.get('/data/:page', (req, res) => {
    const page = req.params.page;
    const data = performanceData.find(entry => entry.page === page);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// POST new performance data
router.post('/data', (req, res) => {
    const newData = {
        id: performanceData.length + 1,
        page: req.body.page,
        loadTime: req.body.loadTime,
        pageSize: req.body.pageSize
    };
    performanceData.push(newData);
    res.status(201).json(newData);
});

module.exports = router;
