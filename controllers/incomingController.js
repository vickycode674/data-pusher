const knex = require('../db/connection')
const axios = require('axios')


const handleIncomingData = async (req, res) => {
    //whenever we need to receive teh respective  header
    const token = req.headers['cl-x-token'];
    const data = req.body;

// 🔐 Step 1: Validate token presence

if (!token) {
    return res.status(401).json({ error: 'Un Authentic' });
}

try {
    const account = await knex('accounts').where({ app_secret_token: token }).first();

    if (!account) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    // 🔐 Step 3: Validate JSON body
    if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid Data' });
    }

    // 🔍 Step 4: Find destinations for account
    const destinations = await knex('destinations').where({ account_id: account.id });

    if (destinations.length === 0) {
        return res.status(200).json({ message: 'No destinations found' });
    }

    // 🚀 Step 5: Loop and forward data
    const results = [];

    for (const dest of destinations) {
        try {
            let response;

            if (dest.http_method === 'GET') {
                response = await axios.get(dest.url, { params: data });
            }

            else if (dest.http_method === 'POST') {
                response = await axios.post(dest.url, data);
            } 
            else if (dest.http_method === 'PUT') {
                response = await axios.put(dest.url, data);
            } 
            else {
                results.push({ id: dest.id, status: 'skipped', reason: 'Unsupported http_method' });
                continue;
            }

            results.push({ id: dest.id, status: response.status });

        } catch (err) {
            console.error(`Error sending to destination ${dest.id}:`, err.message);
            results.push({ id: dest.id, status: 'error', message: err.message });
        }
    }

    return res.status(200).json({ data:data, message: 'Data processed',results });

} catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
}
};

module.exports = {
    handleIncomingData
};

