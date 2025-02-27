import type { AssistantPropsType } from '../types/Synthflow';
import { getSession, supabase } from './supabase';
const synthflowUrl = import.meta.env.VITE_SYNTHFLOW_URL;
const synthflowApiKey = import.meta.env.VITE_SYNTHFLOW_API_KEY;

interface AssistantResponse {
  status: string;
  response: {
    model_id: string;
  };
  details: {
    phone: string;
    voice: string;
  };
}

interface CalendarActionResponse {
  status: string;
  action_id: string;
  message: string;
}

export const createAssistant = async (
  assistant: AssistantPropsType
): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${synthflowApiKey}`,
    },
    body: JSON.stringify(assistant),
  };
  try {
    const response = await fetch(`${synthflowUrl}/assistants`, options);
    if (!response.ok) {
      throw new Error(`Error creating assistant: ${response.statusText}`);
    }

    const data: AssistantResponse = await response.json();
    console.log(data.response.model_id);
    return data.response.model_id;
  } catch (error) {
    console.error('Failed to create assistant:', error);
  }
};

export const updateAssistant = async (cond: AssistantPropsType) => {
  const session = await getSession();
  if (session?.user) {
    console.log(session?.user?.id);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('model_id')
        .eq('user_id', session?.user?.id)
        .single();
      const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${synthflowApiKey}`,
        },
        body: JSON.stringify(cond),
      };
      console.log(data);
      try {
        const response = await fetch(
          `${synthflowUrl}/assistants/${data.model_id}`,
          options
        );
        if (!response.ok) {
          throw new Error(`Error creating assistant: ${response.statusText}`);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
export const getAssistant = async (modelId: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${synthflowApiKey}`,
    },
  };
  try {
    const response = await fetch(
      `${synthflowUrl}/assistants/${modelId}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error creating assistant: ${response.statusText}`);
    }
    const assistant = await response.json();
    return assistant.response.assistants[0];
  } catch (err) {
    console.log(err);
  }
};
async function createAction(payload: any) {
  const response = await fetch(synthflowUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${synthflowApiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Synthflow API error:', error);
    throw new Error('Failed to create Synthflow action');
  }

  return response.json();
}
export async function createSynthflowAction(accessToken: string) {
  // Create Calendar Action
  const calendarAction = {
    CUSTOM_ACTION: {
      url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      name: 'Book Tattoo Appointment',
      description: 'Creates a tattoo appointment in Google Calendar',
      speech_while_using_the_tool:
        "I'm scheduling your tattoo appointment now...",
      method: 'POST',
      custom_auth: {
        is_needed: true,
        location: 'header',
        key: 'Authorization',
        value: `Bearer ${accessToken}`,
      },
      variables_during_the_call: [
        {
          name: 'appointment_date',
          description: 'Date of the appointment (YYYY-MM-DD)',
          example: '2024-03-20',
          type: 'string',
        },
        {
          name: 'appointment_time',
          description: 'Time of the appointment (HH:mm)',
          example: '14:30',
          type: 'string',
        },
        {
          name: 'client_email',
          description: "Client's email address",
          example: 'client@example.com',
          type: 'email',
        },
      ],
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      json_body_stringified: `{
        "summary": "Tattoo Appointment",
        "description": "Tattoo appointment scheduled through voice agent",
        "start": {
          "dateTime": "{{appointment_date}}T{{appointment_time}}:00",
          "timeZone": "UTC"
        },
        "end": {
          "dateTime": "{{appointment_date}}T{{add_hours appointment_time 1}}:00",
          "timeZone": "UTC"
        },
        "attendees": [
          {"email": "{{client_email}}"}
        ],
        "reminders": {
          "useDefault": false,
          "overrides": [
            {"method": "email", "minutes": 1440},
            {"method": "popup", "minutes": 60}
          ]
        }
      }`,
      prompt:
        "I'll help you schedule a tattoo appointment. What date and time would you prefer? I'll also need your email address to send you the calendar invitation.",
    },
  };

  // Create Gmail Action with proper email formatting
  const emailTemplate =
    `From: me@example.com\r\n` +
    `To: {{recipient_email}}\r\n` +
    `Subject: Tattoo Appointment Confirmation\r\n` +
    `Content-Type: text/html; charset=utf-8\r\n` +
    `MIME-Version: 1.0\r\n` +
    `\r\n` +
    `<h1>Tattoo Appointment Confirmation</h1>\r\n` +
    `<p>Your appointment has been scheduled for {{appointment_date}} at {{appointment_time}}.</p>\r\n` +
    `<p>We look forward to seeing you!</p>`;

  const gmailAction = {
    CUSTOM_ACTION: {
      url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      name: 'Send Appointment Email',
      description: 'Sends an email confirmation for the tattoo appointment',
      speech_while_using_the_tool: "I'm sending your confirmation email now...",
      method: 'POST',
      custom_auth: {
        is_needed: true,
        location: 'header',
        key: 'Authorization',
        value: `Bearer ${accessToken}`,
      },
      variables_during_the_call: [
        {
          name: 'recipient_email',
          description: "Recipient's email address",
          example: 'client@example.com',
          type: 'email',
        },
        {
          name: 'appointment_date',
          description: 'Date of the appointment',
          example: '2024-03-20',
          type: 'string',
        },
        {
          name: 'appointment_time',
          description: 'Time of the appointment',
          example: '14:30',
          type: 'string',
        },
      ],
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      json_body_stringified: `{
        "raw": "${base64url(emailTemplate)}"
      }`,
      prompt: "I'll send you a confirmation email. What's your email address?",
    },
  };

  try {
    // Create both actions
    const [calendarResult, gmailResult] = await Promise.all([
      createAction(calendarAction),
      createAction(gmailAction),
    ]);

    return { calendarResult, gmailResult };
  } catch (error) {
    console.error('Error creating Synthflow actions:', error);
    throw error;
  }
}
