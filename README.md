# AI SDK MCP - Google Calendar Assistant

A productivity enhancement assistant that integrates with Google Calendar, designed to help users manage their schedules efficiently. **This is primarily a learning project to demonstrate how to use AI SDK with MCP, not intended for production use.**

## Overview

This project demonstrates how to build an AI assistant that can interact with Google Calendar using the AI SDK and MCP (Machine Control Protocol). It serves as an educational example for developers who want to learn about:

- Building AI assistants with external tool integration
- Implementing MCP (Machine Control Protocol) with the AI SDK
- Connecting AI models to real-world services like Google Calendar
- Creating interactive chat interfaces with streaming responses

The assistant is capable of:

- Retrieving calendar events
- Creating new events
- Updating existing events
- Providing scheduling recommendations
- Responding in Japanese using markdown formatting

## Setup

1. Clone this repository and install dependencies:

```bash
git clone https://github.com/yourusername/ai-sdk-mcp.git
cd ai-sdk-mcp
npm install
# or
yarn
# or
pnpm install
```

2. Set up the Google Calendar MCP server:
   
   This project uses [google-calendar-mcp](https://github.com/nspady/google-calendar-mcp) to connect with Google Calendar. Follow these steps to set it up:

   ```bash
   # Clone the Google Calendar MCP repository
   git clone https://github.com/nspady/google-calendar-mcp.git
   cd google-calendar-mcp
   
   # Install dependencies and build
   npm install
   
   # Set up Google OAuth credentials
   # 1. Create a Google Cloud project and enable the Calendar API
   # 2. Create OAuth 2.0 credentials (Desktop app)
   # 3. Download and save as gcp-oauth.keys.json in the root directory
   
   # Run the authentication flow
   npm run auth
   ```

   Note the absolute path to the built MCP server (`/path/to/google-calendar-mcp/build/index.js`), as you'll need it in the next step.

3. Create a local environment file:

```bash
cp .env.example .env.local
```

4. Configure the environment variables in your `.env.local` file:

- `OPENAI_API_KEY`: Your OpenAI API key (get it from https://platform.openai.com/api-keys)
- `GOOGLE_CALENDAR_MCP_PATH`: Absolute path to the Google Calendar MCP build directory (e.g., `/path/to/google-calendar-mcp/build/index.js`)

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Technical Details

### Architecture

This application uses:

- **Next.js**: For the frontend and API routes
- **AI SDK**: To handle interactions with OpenAI's models
- **MCP (Machine Control Protocol)**: To enable the AI to interact with Google Calendar
- **OpenAI GPT-4o**: To power the conversational interface

The system is designed to receive user prompts, process them using the GPT-4o model, and perform actions on Google Calendar through the MCP interface when needed.

### Implementation

The core functionality is implemented in `app/api/chat/route.ts`, which:

1. Initializes the MCP client to interface with Google Calendar
2. Processes user messages
3. Streams the AI responses back to the user interface

The application uses a system prompt that instructs the AI to:
- Respond in polite Japanese
- Use markdown formatting
- Use "primary" as the calendar ID for all operations

### Security Considerations

- All sensitive information (API keys, paths) is stored in environment variables
- The `.env` file is excluded from version control via `.gitignore`
- Only an example environment file (`.env.example`) is included in the repository

## Disclaimer

**This project is intended for educational purposes only.** It serves as a demonstration of how to use the AI SDK with MCP to integrate with external services like Google Calendar. The application is not designed for production use and lacks many features that would be required in a production environment, such as:

- Comprehensive authentication and authorization
- Proper error handling for all edge cases
- Extensive testing
- Performance optimization
- Multi-user support

If you're interested in building a production-ready application, consider this project as a starting point to learn the concepts, but implement proper security, error handling, and testing before deploying to production.

## Resources

For those looking to learn more about the technologies used in this project:

1. [AI SDK documentation](https://sdk.vercel.ai/docs)
2. [OpenAI API documentation](https://platform.openai.com/docs/api-reference)
3. [MCP documentation](https://sdk.vercel.ai/docs/ai-sdk/machine-control-protocol)
4. [Next.js documentation](https://nextjs.org/docs)
