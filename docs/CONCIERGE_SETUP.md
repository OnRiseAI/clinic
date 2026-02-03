# AI Concierge Setup Guide

This guide explains how to configure the ElevenLabs Conversational AI agent for the MediTravel platform.

## Prerequisites

1. An ElevenLabs account with Conversational AI access
2. The MediTravel application deployed with API routes accessible

## Step 1: Create an ElevenLabs Agent

1. Go to [ElevenLabs Conversational AI](https://elevenlabs.io/conversational-ai)
2. Create a new agent
3. Note the Agent ID for later use

## Step 2: Configure the System Prompt

Copy and paste this system prompt into your ElevenLabs agent configuration:

```
You are a medical tourism concierge for MediTravel. You help patients find the right clinic abroad for their medical needs.

Your capabilities:
- You know about all clinics on the platform, including their specialties, locations, pricing, accreditations, and ratings
- You can recommend specific clinics based on patient needs
- You can compare destinations and explain the pros and cons of each
- You can provide general information about procedures (but always recommend consulting a doctor)

Your approach:
- Start by understanding what the patient is looking for: procedure, preferences, budget, timeline
- Ask one question at a time — don't overwhelm them
- Once you have enough info, recommend 2-3 specific clinics with brief explanations of why each is a good fit
- Offer to help them send an enquiry or provide the clinic's profile link
- Be warm, reassuring, and professional — patients may be nervous about medical travel
- Keep responses concise — this is voice, not text

You must NOT:
- Give specific medical advice or diagnoses
- Promise outcomes or guarantee results
- Share clinic contact information directly — always direct to the clinic profile or enquiry form
- Make claims about specific doctors' abilities

When you recommend clinics, always mention:
- The clinic name and location
- Their rating and review count
- Key accreditations (JCI, ISO, etc.)
- Starting price range
- One unique selling point

Example responses:
- "I found three great options for dental veneers in Turkey. The top rated is Smile Dental Istanbul with 4.8 stars, JCI accredited, starting from €250 per tooth."
- "Turkey and Mexico are both excellent for hair transplants. Turkey has more clinics and slightly lower prices, while Mexico is closer if you're in the US."
```

## Step 3: Configure Server Tools

In the ElevenLabs agent settings, add these server tools:

### Tool 1: Search Clinics

**Name:** `search_clinics`

**Description:** Search for clinics based on procedure, country, budget, and other criteria

**URL:** `https://your-domain.com/api/concierge/search-clinics`

**Method:** POST

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "procedure": {
      "type": "string",
      "description": "The procedure or treatment the patient is looking for (e.g., 'dental veneers', 'hair transplant', 'rhinoplasty')"
    },
    "country": {
      "type": "string",
      "description": "The country the patient prefers (e.g., 'Turkey', 'Mexico', 'Thailand')"
    },
    "budget_max": {
      "type": "number",
      "description": "Maximum budget in EUR"
    },
    "language": {
      "type": "string",
      "description": "Required language spoken at the clinic (e.g., 'English', 'German')"
    },
    "accreditation": {
      "type": "string",
      "description": "Required accreditation (e.g., 'JCI', 'ISO')"
    }
  }
}
```

### Tool 2: Get Clinic Details

**Name:** `get_clinic_details`

**Description:** Get detailed information about a specific clinic

**URL:** `https://your-domain.com/api/concierge/clinic-details`

**Method:** POST

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "clinic_slug": {
      "type": "string",
      "description": "The clinic's URL slug (e.g., 'smile-dental-istanbul')"
    }
  },
  "required": ["clinic_slug"]
}
```

### Tool 3: Get Procedure Info

**Name:** `get_procedure_info`

**Description:** Get information about a specific medical procedure including cost comparisons

**URL:** `https://your-domain.com/api/concierge/procedure-info`

**Method:** POST

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "procedure_slug": {
      "type": "string",
      "description": "The procedure's URL slug (e.g., 'dental-veneers', 'hair-transplant')"
    }
  },
  "required": ["procedure_slug"]
}
```

### Tool 4: Get Destination Info

**Name:** `get_destination_info`

**Description:** Get information about a medical tourism destination

**URL:** `https://your-domain.com/api/concierge/destination-info`

**Method:** POST

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "country_slug": {
      "type": "string",
      "description": "The country's URL slug (e.g., 'turkey', 'mexico', 'thailand')"
    }
  },
  "required": ["country_slug"]
}
```

## Step 4: Configure Voice Settings

1. Choose a voice that sounds warm and professional
2. Recommended: Female voice for a caring, trustworthy tone
3. Set speaking rate to slightly slower than normal for clarity
4. Enable "Allow interruptions" for natural conversation flow

## Step 5: Configure Environment Variable

Add to your `.env.local`:

```bash
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
```

## Step 6: Test the Integration

1. Run your application locally: `npm run dev`
2. Click the floating voice widget in the bottom right
3. Say something like "I'm looking for dental veneers in Turkey"
4. Verify the agent searches for clinics and provides recommendations

## Troubleshooting

### Voice not working
- Check browser microphone permissions
- Ensure HTTPS is enabled (required for microphone access)
- Check browser console for errors

### Tools not being called
- Verify API routes are accessible from the internet
- Check ElevenLabs agent logs for tool call errors
- Ensure tool URLs are correct and use HTTPS

### High latency
- Consider using ElevenLabs data residency options (US, EU, India)
- Use the Flash v2.5 voice model for lower latency
- Optimize your API routes for faster responses

## Analytics

The concierge tracks:
- Sessions started (voice vs text)
- Number of turns per conversation
- Clinics recommended
- Conversion to enquiry

View analytics via the `concierge_daily_stats` and `concierge_clinic_recommendations` views in Supabase.

## Alternative: Text-Only Mode

If you don't configure an ElevenLabs agent, the widget automatically falls back to text chat mode. The text chat uses the same tool calls but without voice.

To disable voice entirely, simply don't set `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.
