const axios = require('axios');

const LOGIN_URL = 'http://localhost:5000/api/login';
const EXPERIENCE_URL = 'http://localhost:5000/api/experiences';

const longImageUrl = "https://media.licdn.com/dms/image/v2/C560BAQF8vnW0dzbzpA/company-logo_200_200/company-logo_200_200/0/1638199780923/angkit_agro_technology_logo?e=1773273600&v=beta&t=swn4L-x8a8OYdRnPtBrjoLnb8d1v-HrLk9uTGoc9sa4";

async function runTest() {
    try {
        // 1. Login
        console.log("Logging in...");
        const loginRes = await axios.post(LOGIN_URL, {
            email: 'test@gmail.com',
            password: 'test123'
        });
        const token = loginRes.data.token;
        console.log("Login successful. Token obtained.");

        // 2. Add Experience
        console.log("Adding experience with image URL...");
        const newExperience = {
            company: "Test Company",
            role: "Test Role",
            period: "2024 - Present",
            description: "Testing image URL persistence.",
            image_url: longImageUrl
        };

        const createRes = await axios.post(EXPERIENCE_URL, newExperience, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Create response:", createRes.status, createRes.data);

        // 3. Verify Persistence
        console.log("Fetching experiences to verify...");
        const getRes = await axios.get(EXPERIENCE_URL);
        const experiences = getRes.data;

        const found = experiences.find(e => e.company === "Test Company" && e.image_url === longImageUrl);

        if (found) {
            console.log("SUCCESS: Experience found with correct image URL!");
            console.log("Saved URL:", found.image_url);

            // Clean up
            console.log("Cleaning up (deleting test experience)...");
            await axios.delete(`${EXPERIENCE_URL}/${found.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Cleanup done.");

        } else {
            console.error("FAILURE: Experience not found or image URL mismatch.");
            console.log("Latest experience:", experiences[0]);
        }

    } catch (error) {
        console.error("Error during test:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

runTest();
