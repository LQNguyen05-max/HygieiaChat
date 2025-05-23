const customReply = [
  // Custom replies for specific inputs
  {
    match: (input) => input.trim().toLowerCase() === "who are you?",
    reply:
      "I am HygieiaBot, an AI HealthCare Assistance Bot to assist with information and tasks. I am here to assist you with your medical queries and provide information about various health topics.",
  },
  {
    match: (input) => input.trim().toLowerCase() === "what is hygieiabot?",
    reply:
      "HygieiaBot is an AI-powered chatbot designed to help you understand your own medical needs. It provides information and resources related to health and wellness.",
  },
  {
    match: (input) => input.trim().toLowerCase() === "who made hygieiabot?",
    reply:
      "HygieiaBot was created by a group of 4 guys from the University of Texas at Dallas. They are a team of students who are passionate about healthcare and technology.",
  },
];

export function getCustomReply(input) {
  const found = customReply.find((item) => item.match(input));
  return found ? found.reply : null;
}
