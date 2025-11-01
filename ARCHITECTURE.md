# Text Generation Tool Architecture

## Current Working Structure

### Frontend Architecture
- **Page File**: `client/app/tools/text-generation/page.tsx`
- **Components Structure**:
  - `client/app/tools/text-generation/components/TextArea.tsx`
  - `client/app/tools/text-generation/components/GenerateButton.tsx`
  - `client/app/tools/text-generation/components/ResponseDisplay.tsx`
- **API Call Handler**: `client/app/tools/text-generation/api-call.ts`
- **Frontend API Route**: `client/app/api/ai/route.ts` (proxy to backend)

### Backend Architecture
- **Main Router**: `server/src/ai/aiRouter.ts`
- **Backend Route**: `POST /api/ai`
- **Provider System**: Sequential fallback mechanism
  - Primary: DeepSeek (`server/src/ai/providers/DeepSeekProvider.ts`)
  - Secondary: Gemini (`server/src/ai/providers/GeminiProvider.ts`)
  - Fallback: OpenAI (`server/src/ai/providers/OpenAIProvider.ts`)

### Request -> Response Flow

#### 1. User Interaction
- User enters prompt in TextArea component
- Clicks Generate button
- Loading state activated

#### 2. Frontend Processing
- `handleGenerate()` function triggered
- Calls `callTextGenerationApi()` from `api-call.ts`
- Sends POST request to `/api/ai` (frontend proxy route)

#### 3. Frontend Proxy
- `client/app/api/ai/route.ts` receives request
- Forwards to backend: `${process.env.NEXT_PUBLIC_API_URL}/api/ai`
- Returns backend response to frontend

#### 4. Backend Processing
- Express server receives POST at `/api/ai`
- Routes to `server/src/ai/aiRouter.ts`
- `generateResponse()` function executes sequential fallback:
  1. **Try DeepSeek**: `deepseek-chat` model via HTTPS API
  2. **If fails, try Gemini**: `gemini-1.5-flash` model via Google SDK
  3. **If fails, try OpenAI**: `gpt-3.5-turbo` model via OpenAI SDK

#### 5. AI Provider Call
- Selected provider processes prompt
- Returns generated text response
- Fallback continues if provider fails

#### 6. Response Chain
- Backend returns: `{ response: "generated_text" }`
- Frontend proxy forwards response
- Frontend displays result in ResponseDisplay component
- Loading state deactivated

### Environment Variables
- **Backend**: `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`
- **Frontend**: `NEXT_PUBLIC_API_URL` (points to backend server)

### Error Handling
- Provider-level error catching with fallback
- Frontend error display in ResponseDisplay component
- Comprehensive logging throughout chain

### Current Deployment
- **Backend Port**: 4000
- **Frontend Port**: 3000
- **Communication**: HTTP requests via proxy pattern