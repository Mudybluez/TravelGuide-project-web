const express = require("express");

const quizzes = {
    famousLandmarks: [
        { question: "Which country is home to the Eiffel Tower?", options: ["France", "Italy", "Germany", "Spain"], correct: 0 },
        { question: "What is the name of the ancient city carved into rock in Jordan?", options: ["Petra", "Machu Picchu", "Angkor Wat", "Chichen Itza"], correct: 0 },
        { question: "Which U.S. city is the Golden Gate Bridge located in?", options: ["New York", "Los Angeles", "San Francisco", "Chicago"], correct: 2 },
        { question: "Which country is known for the Great Wall?", options: ["China", "India", "Russia", "Japan"], correct: 0 },
        { question: "Where is the Taj Mahal located?", options: ["India", "Pakistan", "Bangladesh", "Nepal"], correct: 0 }
    ],
    travelEssentials: [
        { question: "What is a must-have for international travel?", options: ["Passport", "Local SIM card", "A camera", "Guidebook"], correct: 0 },
        { question: "Which item is most important in a first-aid kit for travel?", options: ["Band-aids", "Thermometer", "Tweezers", "Antibiotic cream"], correct: 0 },
        { question: "What should you do before packing liquids for air travel?", options: ["Wrap bottles in plastic bags", "Leave liquids at home", "Buy travel-sized containers", "Both A and C"], correct: 3 }
    ],
    culturalAwareness: [
        { question: "Which country is known for its cherry blossoms in the spring?", options: ["China", "Japan", "South Korea", "Thailand"], correct: 1 },
        { question: "What is the traditional greeting in Thailand?", options: ["Bow", "High-five", "Thumbs up", "Handshake"], correct: 0 },
        { question: "Which continent is the Carnival of Rio de Janeiro celebrated on?", options: ["North America", "South America", "Europe", "Africa"], correct: 1 }
    ]
};

const getQuiz = (req, res) => {
    const category = req.params.category;
    if (quizzes[category]) {
        res.json(quizzes[category]);
    } else {
        res.status(404).json({ message: "Quiz category not found" });
    }
};

module.exports = { getQuiz };
