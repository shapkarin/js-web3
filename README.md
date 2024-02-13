# Connect wallet

# Getting realtime ETH and USDT balance

## How it works
1. 

## I implement API_KEY from abuse
1. Use acces origin to prevent using from not whitelisted domains
2. Kepp API key at the backend side + you can use addition things with special infura private api key



// TODO: rewire!!!!!
1. Restrics requests by infura dashboard by enter yours app URL as an allowed origin.
    1.1 Much better especially in the context of test assignments, when you don't need any aditionl dpecific data from infura using `API KEY SECRET` not just `API KEY`
1. Use server side proxy to keep yours key written at the server code.


1. Method
    To protect your Infura API key using Infura dashboard settings, specifically by configuring HTTP Origin headers for your projects, follow these steps. This approach helps ensure that only requests coming from specified origins (e.g., your application's domain) are allowed, adding a layer of security by preventing unauthorized use of your API key from other domains.

    Step-by-Step Guide:
    Log In to Infura:

    Access the Infura website (https://infura.io/) and log in to your account.
    Navigate to Your Project:

    Go to the dashboard where your projects are listed.
    Click on the project for which you want to configure the HTTP Origin headers.
    Project Settings:

    Inside the project dashboard, look for a section related to security settings or API key restrictions. Infura's interface may evolve, so the exact naming might change. Typically, it could be under "Settings" or a similar section.
    Security Settings:

    Find the setting that allows you to specify HTTP Origins, CORS (Cross-Origin Resource Sharing) settings, or referer restrictions. This feature is designed to limit which websites can make requests using your API key.
    Configure HTTP Origins:

    In the provided field, enter the origins that should be allowed to use your API key. Origins are essentially the base URLs of your application from which requests to Infura will be made.
    For example, if your application is hosted at https://mydapp.example.com, you would enter this URL as an allowed origin.
    You can specify multiple origins if your application is accessible from more than one domain.
    Save Your Settings:

    After adding the necessary HTTP Origins, make sure to save your changes. Infura should now only accept requests made from the specified origins using your API key.
    Additional Tips:
    Review and Test: After configuring, review your settings to ensure they are correct. Test your application to verify that it can still successfully make requests to Infura and that requests from unauthorized origins are blocked.
    Monitor Usage: Regularly monitor your API usage through the Infura dashboard to detect any unusual patterns or unexpected usage, which could indicate attempts to bypass your restrictions.
    Keep Your Domains Up-to-Date: If you change your application's domain or add new environments (like staging or development sites), remember to update your HTTP Origins settings in Infura accordingly.
    By following these steps and best practices, you can leverage Infura's dashboard settings to add a layer of security, protecting your API key by ensuring that only requests from authorized origins are allowed.

1. Nethod
    More datiled:
    Implementing a Go language socket proxy to obtain real-time wallet balances using Infura's JSON-RPC over WebSocket offers several advantages, especially regarding security, performance, and scalability. Here's a detailed breakdown of why this approach is beneficial:

    1. Security
    API Key Protection: By using a Go server as a proxy, the Infura API key is kept secure on the server side, preventing exposure to the client side. This reduces the risk of unauthorized use of your Infura account.
    Controlled Access: The Go server can implement additional security measures such as IP whitelisting, rate limiting, and authentication, which provide tighter control over who can access the blockchain data and how often.
    Encapsulation of Business Logic: Sensitive business logic, like determining which wallet transactions to monitor or how to process data from the blockchain, is encapsulated within the server. This minimizes the risk of exposing vulnerabilities or proprietary logic through client-side code.
    2. Performance and Efficiency
    Connection Management: A Go server can efficiently manage WebSocket connections to Infura, maintaining a persistent connection that can be reused for multiple client requests. This is more efficient than establishing a new connection for each client request directly from the browser.
    Concurrency: Go's concurrency model, based on goroutines, is well-suited for handling multiple, simultaneous WebSocket connections. This allows for high performance and efficient real-time data processing, even under heavy load.
    Data Preprocessing: The Go server can preprocess, filter, and aggregate the data from Infura before sending it to the client. This reduces the amount of data transferred over the network and offloads processing work from the client, resulting in faster updates and lower bandwidth usage.
    3. Scalability
    Load Balancing: As your application grows, a Go server infrastructure can be scaled horizontally across multiple instances behind a load balancer. This setup can handle increased load by distributing requests among server instances, something that direct client-to-Infura connections cannot achieve.
    Caching: The Go server can implement caching strategies for frequently requested data, reducing the need to fetch the same data repeatedly from Infura. This decreases latency for end-users and reduces the load on Infura, which is particularly beneficial given rate limits and usage quotas.
    4. Flexibility and Control
    Custom Protocols: With your own Go proxy server, you have the flexibility to implement custom communication protocols or message formats between the server and clients, tailoring the data flow to your application's specific needs.
    Centralized Logging and Monitoring: The server can log requests and responses, monitor performance metrics, and alert administrators to unusual patterns or errors. Centralized logging aids in troubleshooting and ensures the health and reliability of the data pipeline.
    5. Cost Management
    Efficient Use of Infura Quota: By aggregating requests and caching responses, the Go server helps optimize the use of your Infura quota, potentially lowering costs associated with exceeding free tier limits or scaling into paid tiers.
    In summary, using a Go language socket proxy for real-time wallet balance updates via Infura's WebSocket interface offers a robust, secure, and efficient solution. It addresses key concerns around security, performance, scalability, and cost, making it a superior choice for production-grade applications.


    ++++++


    Use CORS (Cross-Origin Resource Sharing) on Your Server
CORS is a security feature that allows you to restrict the resources on a web server to be requested only from certain domains. If you are using a server-side component (like a Go server, as previously discussed) as a proxy between your client-side application and Infura, you can configure CORS settings on your server to accept requests only from known origins.

Configure CORS in Your Server:

In your server's configuration, set the Access-Control-Allow-Origin header to specify the domains allowed to make requests. For a specific domain, this would look like:
go
Copy code
w.Header().Set("Access-Control-Allow-Origin", "https://mydapp.example.com")
Ensure that your server handles preflight requests by responding to OPTIONS requests with appropriate Access-Control-Allow-Methods and Access-Control-Allow-Headers headers.
Verify Origin in Server-Side Code:

Beyond CORS, for additional security, manually verify the Origin header in incoming requests to your server-side proxy to ensure they match your expected domain(s).
This adds an extra layer of validation to prevent unauthorized use of your server as a proxy.
Protecting the Integrity of Your Requests
While CORS helps manage which domains can make requests to your server, ensuring the integrity of requests involves validating that the requests to Infura are indeed originating from your application.

HTTP Origin Headers:

Ensure that client-side requests to your server include the Origin header. This is usually set automatically by browsers in the context of CORS.
On the server, validate that the Origin header matches your expected domain(s) before forwarding the request to Infura.
API Key Management:

Never embed your Infura API key directly in client-side code. Instead, keep the API key on your server, and use it to make requests to Infura on behalf of your clients.
If your server application needs to communicate directly with Infura, ensure the API key is stored securely, using environment variables or secure key management services.
Rate Limiting and Monitoring:

Implement rate limiting on your server to control the amount of traffic forwarded to Infura, preventing abuse and potential depletion of your Infura usage quota.
Monitor usage patterns and set up alerts for unusual activity or error rates that could indicate abuse or misconfiguration.
Summary
By configuring CORS properly on your server, verifying the Origin header for incoming requests, and securely managing your API key, you can protect your Infura usage from unauthorized access and ensure that your application's requests to the blockchain are secure and reliable. Remember, the key is to keep sensitive information and logic on the server side, where you have more control and can apply robust security measures.