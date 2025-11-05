import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('🔍 Testing GitHub API from server...');
  
  try {
    const token = process.env.GITHUB_TOKEN;
    
    console.log('Token exists:', !!token);
    console.log('Token length:', token ? token.length : 0);
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'GitHub token not configured',
        details: 'GITHUB_TOKEN environment variable is missing'
      });
    }

    // First test: Validate token
    console.log('Testing token validation...');
    const tokenResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'GitHub-Portfolio-Test'
      }
    });

    console.log('Token validation status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.json();
      return NextResponse.json({
        success: false,
        error: 'Token validation failed',
        details: tokenError,
        status: tokenResponse.status
      });
    }

    const tokenData = await tokenResponse.json();
    console.log('Authenticated as:', tokenData.login);

    // Second test: GraphQL query
    console.log('Testing GraphQL query...');
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

    console.log('Making GraphQL request for user:', username);
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub-Portfolio-Test'
      },
      body: JSON.stringify({ query, variables }),
    });

    console.log('GraphQL response status:', graphqlResponse.status);

    if (!graphqlResponse.ok) {
      const errorText = await graphqlResponse.text();
      console.error('GraphQL HTTP error:', errorText);
      return NextResponse.json({
        success: false,
        error: `GraphQL HTTP error: ${graphqlResponse.status}`,
        details: errorText
      });
    }

    const graphqlData = await graphqlResponse.json();
    console.log('GraphQL response received');

    if (graphqlData.errors) {
      console.error('GraphQL errors:', graphqlData.errors);
      return NextResponse.json({
        success: false,
        error: 'GraphQL errors',
        details: graphqlData.errors
      });
    }

    const contributions = graphqlData.data?.user?.contributionsCollection?.contributionCalendar;
    
    return NextResponse.json({
      success: true,
      tokenValid: true,
      authenticatedAs: tokenData.login,
      userData: {
        username,
        year,
        totalContributions: contributions?.totalContributions || 0,
        weeksCount: contributions?.weeks?.length || 0,
        rateLimit: graphqlData.data?.rateLimit
      },
      sampleData: {
        firstWeek: contributions?.weeks?.[0] || null,
        lastWeek: contributions?.weeks?.[contributions?.weeks?.length - 1] || null
      }
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}