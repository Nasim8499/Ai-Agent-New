{
  "name": "Application intake",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "application-intake",
        "responseMode": "onReceived"
      },
      "id": "webhook",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "name": "status", "value": "queued" },
            { "name": "plan", "value": "[\"start_browser\", \"collect_profile\", \"validate_documents\", \"submit_application\"]" }
          ]
        }
      },
      "id": "set-status",
      "name": "Set status",
      "type": "n8n-nodes-base.set",
      "typeVersion": 2,
      "position": [520, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          { "node": "Set status", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}
