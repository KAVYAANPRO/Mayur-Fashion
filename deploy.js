
const fs = require("fs");
const path = require("path");

async function deploy() {
    console.log("Starting deployment...");
    const token = process.env.ANTIDEPLOY_TOKEN;
    
    const FormData = require("form-data");
    const axios = require("axios");
    
    const form = new FormData();
    form.append("applicationId", "d8ef5185-3c59-40c5-88dd-ddcb549a5102");
    form.append("file", fs.createReadStream("dist.tar.gz"));
    
    console.log("Uploading...");
    try {
        const response = await axios.post("https://antideploy.com/api/v1/deploy", form, {
            headers: {
                ...form.getHeaders(),
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("Status:", response.status);
        console.log("Response:", response.data);
    } catch (e) {
        if (e.response) {
            console.error("Error:", e.response.status, e.response.data);
        } else {
            console.error("Error:", e.message);
        }
    }
}
deploy();

