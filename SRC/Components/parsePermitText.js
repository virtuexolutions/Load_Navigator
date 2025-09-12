
const extractValue = (text, keywords) => {
  for (const keyword of keywords) {
    // Regex to find the keyword followed by a colon, and capture everything until the next line with a colon
    const regex = new RegExp(`${keyword}\\s*:\\s*([\\s\\S]*?)(?=\\n[\\w\\s]+:|$)`, 'i');
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
};


const parseCoords = (text) => {
    const coordRegex = /(-?\d{1,3}\.\d{4,}),\s*(-?\d{1,3}\.\d{4,})/;
    const match = text.match(coordRegex);
    if (match && match[1] && match[2]) {
        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
            return { lat, lng };
        }
    }
    return { lat: null, lng: null };
};


export const parsePermitText = (text) => {
  // Define flexible keywords. This is the key to handling different permit formats.
  const permitIdKeywords = ['Permit#', 'Permit No', 'Permit ID'];
  const issuerKeywords = ['Issuer', 'Issued By', 'Authority'];
  const originKeywords = ['Origin', 'From', 'Start', 'Begin'];
  const destinationKeywords = ['Destination', 'To', 'End', 'Arrive'];
  const waypointKeywords = ['Waypoints', 'Via', 'Route', 'Checkpoints'];

  const permit_id = extractValue(text, permitIdKeywords) || 'N/A';
  const issuer = extractValue(text, issuerKeywords);

  const originText = extractValue(text, originKeywords);
  const destinationText = extractValue(text, destinationKeywords);
  const waypointsText = extractValue(text, waypointKeywords);
  
  const waypoints = waypointsText
    .split(/;|\n/) // Split by semicolon OR new line for more flexibility
    .map(part => {
        // Clean up common prefixes like "Checkpoint 1 -"
        const cleanedPart = part.replace(/checkpoint \d+ -/i, '').trim();
        if (!cleanedPart) return null;
        const coords = parseCoords(cleanedPart);
        return { text: cleanedPart, ...coords };
    })
    .filter(Boolean); // filter(Boolean) removes any null entries

  return {
    permit_id,
    issuer,
    origin: {
      text: originText,
      ...parseCoords(originText)
    },
    destination: {
      text: destinationText,
      ...parseCoords(destinationText)
    },
    waypoints
  };
};