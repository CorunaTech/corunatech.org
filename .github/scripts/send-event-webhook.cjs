const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

module.exports = async ({ core }) => {
  try {
    const eventFile = process.env.EVENT_FILE;
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!eventFile) {
      core.setFailed('EVENT_FILE environment variable is required');
      return;
    }

    if (!webhookUrl) {
      core.setFailed('WEBHOOK_URL environment variable is required');
      return;
    }

    console.log(`Reading event file: ${eventFile}`);

    // Parse event YAML
    const eventContent = fs.readFileSync(eventFile, 'utf8');
    const event = yaml.load(eventContent);

    console.log('Event data:', JSON.stringify(event, null, 2));

    // Get community data if specified
    let community = null;
    if (event.community) {
      const communityFile = path.join('src/content/communities', `${event.community}.yaml`);

      if (fs.existsSync(communityFile)) {
        console.log(`Reading community file: ${communityFile}`);
        const communityContent = fs.readFileSync(communityFile, 'utf8');
        community = yaml.load(communityContent);
        console.log('Community data:', JSON.stringify(community, null, 2));
      } else {
        console.warn(`Community file not found: ${communityFile}`);
      }
    }

    // Build webhook payload
    const payload = {
      event: {
        title: event.title,
        description: event.description,
        date: event.date,
        duration: event.duration,
        location: event.location,
        rsvpLink: event.rsvpLink,
        tags: event.tags || [],
      },
      community: community ? {
        id: event.community,
        name: community.name,
        description: community.description,
        logo: community.logo,
        tags: community.tags || [],
        technologies: community.technologies || [],
        meetingFrequency: community.meetingFrequency,
      } : null,
      metadata: {
        source: 'corunatech.org',
        timestamp: new Date().toISOString(),
      }
    };

    console.log('Sending webhook payload:', JSON.stringify(payload, null, 2));

    // Send webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      core.setFailed(`Webhook failed with status ${response.status}: ${errorText}`);
      return;
    }

    console.log(`Webhook sent successfully! Status: ${response.status}`);

    const responseData = await response.text();
    if (responseData) {
      console.log('Webhook response:', responseData);
    }

  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
    console.error(error);
  }
};
