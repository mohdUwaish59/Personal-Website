// Test script to debug GitHub API
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
function loadEnvFile() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const envVars = {};

        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    envVars[key.trim()] = valueParts.join('=').trim();
                }
            }
        });

        return envVars;
    } catch (error) {
        console.error('Error reading .env.local:', error.message);
        return {};
    }
}

async function testGitHubAPI() {
    console.log('🔍 Testing GitHub API...\n');

    // Load environment variables
    const envVars = loadEnvFile();
    const token = envVars.GITHUB_TOKEN;
    console.log('1. Token check:');
    console.log('   Token exists:', !!token);
    console.log('   Token length:', token ? token.length : 0);
    console.log('   Token prefix:', token ? token.substring(0, 10) + '...' : 'N/A');
    console.log('');

    if (!token) {
        console.error('❌ No GitHub token found in environment variables');
        return;
    }

    // Test the GraphQL query
    const username = "mohdUwaish59";
    const year = 2024;
    const fromDate = `${year}-01-01T00:00:00Z`;
    const toDate = `${year}-12-31T23:59:59Z`;

    const query = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) { 
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `;

    const variables = {
        userName: username,
        from: fromDate,
        to: toDate
    };

    console.log('2. Request details:');
    console.log('   Username:', username);
    console.log('   Year:', year);
    console.log('   From:', fromDate);
    console.log('   To:', toDate);
    console.log('');

    try {
        console.log('3. Making API request...');
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'GitHub-Contributions-Test'
            },
            body: JSON.stringify({ query, variables }),
        });

        console.log('   Response status:', response.status);
        console.log('   Response headers:', Object.fromEntries(response.headers.entries()));
        console.log('');

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ HTTP Error:', response.status, response.statusText);
            console.error('   Error body:', errorText);
            return;
        }

        const data = await response.json();

        console.log('4. Response analysis:');
        console.log('   Has errors:', !!data.errors);

        if (data.errors) {
            console.error('❌ GraphQL Errors:');
            data.errors.forEach((error, index) => {
                console.error(`   Error ${index + 1}:`, error.message);
                if (error.locations) {
                    console.error('   Locations:', error.locations);
                }
                if (error.path) {
                    console.error('   Path:', error.path);
                }
            });
            return;
        }

        console.log('   Has data:', !!data.data);
        console.log('   Has user:', !!data.data?.user);

        if (data.data?.user) {
            const contributions = data.data.user.contributionsCollection.contributionCalendar;
            console.log('   Total contributions:', contributions.totalContributions);
            console.log('   Number of weeks:', contributions.weeks.length);
            console.log('   First week days:', contributions.weeks[0]?.contributionDays.length || 0);
        }

        if (data.data?.rateLimit) {
            console.log('   Rate limit remaining:', data.data.rateLimit.remaining);
            console.log('   Rate limit cost:', data.data.rateLimit.cost);
        }

        console.log('\n✅ API test completed successfully!');
        console.log('\n5. Sample data structure:');
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('❌ Request failed:', error.message);
        console.error('   Stack:', error.stack);
    }
}

// Test token validation separately
async function testTokenValidation() {
    console.log('\n🔐 Testing token validation...\n');

    const envVars = loadEnvFile();
    const token = envVars.GITHUB_TOKEN;

    if (!token) {
        console.error('❌ No token to validate');
        return;
    }

    try {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'GitHub-Token-Test'
            }
        });

        console.log('Token validation status:', response.status);

        if (response.ok) {
            const userData = await response.json();
            console.log('✅ Token is valid');
            console.log('   Authenticated as:', userData.login);
            console.log('   Account type:', userData.type);
        } else {
            const errorData = await response.json();
            console.error('❌ Token validation failed');
            console.error('   Error:', errorData.message);
        }
    } catch (error) {
        console.error('❌ Token validation error:', error.message);
    }
}

// Run tests
async function runAllTests() {
    await testTokenValidation();
    await testGitHubAPI();
}

runAllTests().catch(console.error);