const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const LOGIN_CREDENTIALS = { email: 'test@gmail.com', password: 'test123' }; // Updated credentials

async function testCRUD() {
    try {
        console.log("1. Logging in...");
        const loginRes = await axios.post(`${API_URL}/login`, LOGIN_CREDENTIALS);
        const token = loginRes.data.token;
        console.log("   Login Successful. Token received.");

        const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

        console.log("\n2. Creating Experience...");
        const newExp = {
            company: "Test Corp",
            role: "Tester",
            period: "2024",
            description: "Testing CRUD"
        };
        await axios.post(`${API_URL}/experiences`, newExp, authHeaders);
        console.log("   Experience Created.");

        console.log("\n3. Fetching Experiences...");
        const fetchRes = await axios.get(`${API_URL}/experiences`);
        const experiences = fetchRes.data;
        const createdExp = experiences.find(e => e.company === "Test Corp");

        if (!createdExp) {
            throw new Error("Created experience not found!");
        }
        console.log(`   Experience Found: ID ${createdExp.id}`);

        console.log("\n4. Updating Experience...");
        const updatedExp = { ...createdExp, role: "Senior Tester" };
        await axios.put(`${API_URL}/experiences/${createdExp.id}`, updatedExp, authHeaders);
        console.log("   Experience Updated.");

        console.log("\n5. Deleting Experience...");
        await axios.delete(`${API_URL}/experiences/${createdExp.id}`, authHeaders);
        console.log("   Experience Deleted.");

        console.log("\n✅ ALL TESTS PASSED");

    } catch (error) {
        console.error("\n❌ TEST FAILED:", error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

testCRUD();
