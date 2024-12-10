// Yoinked from 
// https://github.com/flo-bit/edge-function-github-contribution/blob/main/api/github-data.ts

import { NextRequest } from 'next/server'
import cors from '../lib/cors';

export const config = {
  runtime: 'edge',
}

/**
 * Handles the GET request to fetch GitHub user data.
 * 
 * This function processes the incoming request, constructs a GraphQL query to fetch user data from GitHub,
 * and returns the data in the response. It supports optional user selection based on the query parameter.
 * 
 * Get data of user that owns the token:
 * https://<your-deployment-url>/api/github-data
 * Get data of a specific user:
 * https://<your-deployment-url>/api/github-data?user=<username>
 * 
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<Response>} - The response containing the GitHub user data or an error message.
 * @author @flo-bit
 * 
 * The function performs the following steps:
 * 1. Parses the request URL to extract the 'user' query parameter.
 * 2. Constructs a GraphQL query based on whether user selection is allowed and the presence of the 'user' parameter.
 * 3. Fetches data from GitHub's GraphQL API using a token stored in environment variables.
 * 4. Handles the response from GitHub, including error handling and data transformation.
 * 5. Returns the fetched data in the response, with appropriate CORS headers.
 * 
 * Note: The cost of the current query is 1 (rate limit is 5000 per hour).
 */
export async function GET(req: NextRequest) {
  const allowUserSelection = true;

  const { searchParams } = new URL(req.url);
  const login = searchParams.get('user');

  if(login && !allowUserSelection) {
    return new Response('User selection is disabled', { status: 400 });
  }

  const query = (login && allowUserSelection ? `
    query($login: String!) {
      user(login: $login) {
      ` : `
    query {
      viewer {
      `) + `
          login
          avatarUrl
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
          repositories(
              first: 100
              ownerAffiliations: OWNER
              privacy: PUBLIC
              orderBy: { field: STARGAZERS, direction: DESC }
          ) {
            totalCount
            nodes {
              name
              stargazerCount
              description
              forkCount
              createdAt
              updatedAt
              watchers {
                totalCount
              }
              languages(first: 10) {
                totalSize
                edges {
                  node {
                    name
                  }
                  size
                }
              }
				    }
          }
          starredRepositories {
            totalCount
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
          issues_sum:issues{
            totalCount
          }
          issues_open:issues(states: OPEN){
            totalCount
          }
          issues_closed:issues(states: CLOSED){
            totalCount
          }
          pr_sum:pullRequests{
            totalCount
          }
          pr_open:pullRequests(states: OPEN){
            totalCount
          }
          pr_closed:pullRequests(states: CLOSED){
            totalCount
          }
          pr_merged:pullRequests(states: MERGED){
            totalCount
          }
          status {
            emoji
            message
            expiresAt
            updatedAt
          }
        }
      }
  `;

    //
    // to check cost of query, add this to the query (before the last } bracket)
    // rateLimit {
    //   cost
    //   remaining
    // }
    // cost of current query is 1 (rate limit 5000 per hour)
  
    // Fetch data from GitHub using the token stored in Vercel environment variables
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` // Fetching the GitHub token securely
      },
      body: JSON.stringify({ query, variables: { login } }),
    });
  
    if (!response.ok) {
      return cors(req, new Response(`Error fetching data from GitHub: ${response.statusText}`, { status: 500 }));
    }
  
    const data = await response.json();

    if(!data.data) {
      return cors(req, new Response(`Error fetching data from GitHub: ${data.message}`, { status: 500 }));
    }

    // change from data.data.viewer to data.data.user if necessary
    if(data.data.viewer) {
      data.data.user = data.data.viewer;

      delete data.data.viewer;

      console.log('Changed viewer to user');
    }

    
    return cors(req, new Response(JSON.stringify(data.data), {
      headers: { 'Content-Type': 'application/json' },
    }));
  }