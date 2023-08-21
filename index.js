import fetch from "node-fetch"; 
import * as core from "@actions/core";

const accessToken = core.getInput("PAT"); 
const discussionId = core.getInput("discussionId"); 
const updating_body = core.getInput("updatedbody");

const graphqlMutation = `
  mutation {
    updateDiscussion(input: {
      discussionId: "${discussionId}",
      body: "${updating_body}"
    }) {
      discussion {
        id
        body
      }
    }
  }
`;
console.log ("accessToken-", accessToken );
console.log ("discussionId-" , discussionId );
console.log ("updating_body-", updating_body );
console.log ("mutation-" , graphqlMutation);

const apiUrl = 'https://api.github.com/graphql';
console.log ("apiUrl-", apiUrl );


const headers = {
  Authorization: 'Bearer ' + accessToken,
  'Content-Type': 'application/json',
};

console.log ("headers-", headers );


fetch(apiUrl, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ query: graphqlMutation }),
})
.then(response => {
 
    if (response.status === 200) {
        console.log('Discussion updated successfully.');}
});
